package com.educhat.backend.services;

import com.educhat.backend.DTO.*;
import com.educhat.backend.exceptions.*;
import com.educhat.backend.models.*;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final SubjectRepository subjectRepository;
    private final FacultyUserRepository facultyUserRepository;
    private final FacultyYearRepository facultyYearRepository;
    private final AnswerRepository answerRepository;
    private final PostImageRepository postImageRepository;
    private final AnswerImageRepository answerImageRepository;

    private final CloudinaryService cloudinaryService;
    private final PostInteractionRepository postInteractionsRepository;

    public List<PostResponseDTO> getPostsBySubject(Long subjectId, Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found");
        }
        if (!subjectRepository.existsById(subjectId)) {
            throw new SubjectNotFoundException("Subject not found");
        }
        List<Post> posts = postRepository.findBySubjectId(subjectId);

        // Fetch facultyUserId for the current user
        FacultyUser facultyUser = facultyUserRepository.findByUserId(userId)
                .stream()
                .filter(fu -> !fu.isKicked())
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Faculty user not found or inactive."));
        Long facultyUserId = facultyUser.getId();

        return posts.stream()
                .map(post -> {
                    // Fetch the PostInteractions for the user and post
                    PostInteractions interaction = postInteractionsRepository.findByPostIdAndFacultyUserId(post.getId(), facultyUserId)
                            .orElse(new PostInteractions(post.getId(), facultyUserId));

                    return new PostResponseDTO(
                            post.getId(),
                            post.getTitle(),
                            post.getDescription(),
                            post.getFacultyUserId(),
                            post.getSubjectId(),
                            interaction.isUpvoted(),
                            interaction.isDownvoted(),
                            post.isActive(),
                            isUserAdmin(subjectId, userId) || isUserAuthor(post, userId)
                    );
                })
                .collect(Collectors.toList());
    }

    // find if user is the author of post
    private boolean isUserAuthor(Post post, Long userId) {
        Long facultyUserId = post.getFacultyUserId();
        FacultyUser facultyUser = facultyUserRepository.findById(facultyUserId)
                .orElseThrow( () -> new FacultyUserNotFoundException("FacultyUser not found"));
        return facultyUser.getUserId().equals(userId);
    }

    // find if user is admin by subjectId and userId
    private boolean isUserAdmin(Long subjectId, Long userId) {

        // check if user is app admin
        User user = userRepository.findById(userId).orElseThrow( () -> new UserNotFoundException("User not found"));
        if(user.getRole().equals(Role.ADMIN)) {
            return true;
        }

        // check if user is faculty admin
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow( () -> new SubjectNotFoundException(("Subject now found")));
        Long facultyYearId = subject.getFacultyYearId();

        FacultyYear facultyYear = facultyYearRepository.findById(facultyYearId)
                .orElseThrow( () -> new FacultyYearNotFoundException("FacultyYear not found"));
        Long facultyId = facultyYear.getFacultyId();

        Optional<FacultyUser> facultyUserOptional = facultyUserRepository.findByUserIdAndFacultyIdAndRole(userId, facultyId, Role.ADMIN);
        return facultyUserOptional.isPresent();
    }

    // find if user is admin by userId and facultyId
    private boolean isUserAdmin_2(Long userId, Long facultyId) {
        // check if user is app admin
        User user = userRepository.findById(userId).orElseThrow( () -> new UserNotFoundException("User not found"));
        if(user.getRole().equals(Role.ADMIN)) {
            return true;
        }
        // check if user is faculty admin
        Optional<FacultyUser> facultyUserOptional = facultyUserRepository.findByUserIdAndFacultyIdAndRole(userId, facultyId, Role.ADMIN);
        return facultyUserOptional.isPresent();
    }


    public Post createPostAndImages(Long userId, PostCreateDTO postCreateDTO, List<MultipartFile> imageFiles) {
        // Step 1: Check if the user exists
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found");
        }

        // Step 2: Check if the user is linked to the faculty
        FacultyUser facultyUser = facultyUserRepository.findByUserIdAndFacultyId(userId, postCreateDTO.getFacultyId())
                .orElseThrow(() -> new FacultyUserNotFoundException("FacultyUser not found"));
        // Step 3: Create and save the Post
        Post post = new Post();
        post.setTitle(postCreateDTO.getPostHeader());
        post.setDescription(postCreateDTO.getPostContent());
        post.setFacultyUserId(facultyUser.getId());
        post.setSubjectId(postCreateDTO.getSubjectId());
        post.setUpvotes(0);
        post.setDownvotes(0);
        post.setReports(0);
        post.setActive(true);

        Post savedPost = postRepository.save(post);

        // Step 4: Upload images to Cloudinary and link to the post (optional step)
        if (imageFiles != null && !imageFiles.isEmpty()) {
            List<PostImage> postImagesForSave = new ArrayList<>();
            for (MultipartFile file : imageFiles) {
                try {
                    // Upload the file to Cloudinary
                    File tempFile = File.createTempFile("upload", file.getOriginalFilename());
                    file.transferTo(tempFile);

                    String imageUrl = cloudinaryService.uploadFile(tempFile); // Upload and get URL
                    tempFile.delete(); // Clean up temporary file

                    // Create and save PostImage
                    PostImage postImage = new PostImage();
                    postImage.setPostId(savedPost.getId());
                    postImage.setLink(imageUrl);
                    postImagesForSave.add(postImage);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to upload image: " + e.getMessage());
                }
            }

            postImageRepository.saveAll(postImagesForSave); // Save all images
        }

        return savedPost;
    }


    public PostDetailsDTO getPostDetails(Long postId, Long userId) {
        // check if current user exists
        if(!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found");
        }
        // get post
        Post post = postRepository.findById(postId).orElseThrow( () -> new PostNotFoundException("Post not found"));

        // create main dto response
        PostDetailsDTO response = new PostDetailsDTO();
        response.setPostHeader(post.getTitle());
        response.setPostContent(post.getDescription());

        // find post author username
        FacultyUser facultyUser = facultyUserRepository.findById(post.getFacultyUserId())
                .orElseThrow(() -> new FacultyUserNotFoundException("FacultyUser not found"));
        User userAuthor = userRepository.findById(facultyUser.getUserId())
                .orElseThrow( () -> new UserNotFoundException("User not found"));
        response.setAuthor(userAuthor.getRealUsername());

        response.setUpvotes(post.getUpvotes());
        response.setDownvotes(post.getDownvotes());
        response.setReports(post.getReports());

        // post images
        List<String> postImagesUrl = new ArrayList<>();
        for(PostImage image : postImageRepository.findByPostId(postId)) {
            postImagesUrl.add(image.getLink());
        }
        response.setImages(postImagesUrl);

        // user can edit post if user is author of post or user is admin
        response.setEditable(userId.equals(userAuthor.getId()) ||
                isUserAdmin_2(userId, facultyUser.getFacultyId()));

        // find answers
        List<AnswerDetailsDTO> answersDTO = new ArrayList<>();
        for(Answer answer : answerRepository.findByPostId(postId)) {
            // find answer author
            FacultyUser facultyUserAnswer = facultyUserRepository.findById(answer.getFacultyUserId())
                    .orElseThrow(() -> new FacultyUserNotFoundException("FacultyUser not found"));
            User userAuthorAnswer = userRepository.findById(facultyUserAnswer.getUserId())
                    .orElseThrow( () -> new UserNotFoundException("User not found"));
            // get answer images
            List<String> answerImagesUrl = new ArrayList<>();
            for(AnswerImage image : answerImageRepository.findByAnswerId(answer.getId())) {
                answerImagesUrl.add(image.getLink());
            }
            // create answer dto
            answersDTO.add(new AnswerDetailsDTO(
                    answer.getDescription(),
                    answerImagesUrl,
                    userAuthorAnswer.getRealUsername(),
                    userId.equals(userAuthorAnswer.getId()) || isUserAdmin_2(userId, facultyUserAnswer.getFacultyId()),
                    false,
                    false,
                    answer.isLikedByAuthor()));
        }
        response.setAnswerDetails(answersDTO);

        return response;
    }

    public boolean deletePost(Long postId, Long userId) {
        // Fetch the post
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException("Post not found."));

        // Check if the user is the creator of the post
        if (post.getFacultyUserId().equals(userId)) {
            postRepository.delete(post);
            return true;
        }

        // Fetch the FacultyUser associated with the userId
        FacultyUser facultyUser = facultyUserRepository.findByUserId(userId)
                .stream()
                .filter(fu -> !fu.isKicked()) // Ensure the user is not kicked
                .findFirst()
                .orElseThrow(() -> new FacultyUserNotFoundException("Faculty user not found or inactive."));

        // Fetch the Subject and FacultyYear to determine the faculty of the post
        Subject subject = subjectRepository.findById(post.getSubjectId())
                .orElseThrow(() -> new SubjectNotFoundException("Subject not found."));

        FacultyYear facultyYear = facultyYearRepository.findById(subject.getFacultyYearId())
                .orElseThrow(() -> new FacultyYearNotFoundException("Faculty year not found."));

        // Check if the user has ADMIN role and belongs to the same faculty
        if (facultyUser.getRole() == Role.ADMIN && facultyUser.getFacultyId().equals(facultyYear.getFacultyId())) {
            postRepository.delete(post);
            return true;
        }

        // If neither condition is met, return false
        return false;
    }

}
