package com.educhat.backend.services;

import com.educhat.backend.DTO.PostCreateDTO;
import com.educhat.backend.DTO.PostResponseDTO;
import com.educhat.backend.exceptions.FacultyUserNotFoundException;
import com.educhat.backend.exceptions.FacultyYearNotFoundException;
import com.educhat.backend.exceptions.SubjectNotFoundException;
import com.educhat.backend.exceptions.UserNotFoundException;
import com.educhat.backend.models.*;
import com.educhat.backend.models.enums.PostType;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.*;
import lombok.RequiredArgsConstructor;
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

    private final CloudinaryService cloudinaryService;

    public List<PostResponseDTO> getPostsBySubject(Long subjectId, Long userId) {
        if(!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found");
        }
        if(!subjectRepository.existsById(subjectId)) {
            throw new SubjectNotFoundException("Subject not found");
        }
        List<Post> posts = postRepository.findBySubjectId(subjectId);

        return posts.stream()
                .map(post -> new PostResponseDTO(
                        post.getId(),
                        post.getTitle(),
                        post.getDescription(),
                        post.getFacutlyUserId(),
                        post.getSubjectId(),
                        post.getUpvotes(),
                        post.getDownvotes(),
                        post.getReports(),
                        post.isActive(),
                        isUserAdmin(subjectId,userId) || isUserAuthor(post,userId)))
                .collect(Collectors.toList());
    }

    // find if user is the author of post
    private boolean isUserAuthor(Post post, Long userId) {
        Long facultyUserId = post.getFacutlyUserId();
        FacultyUser facultyUser = facultyUserRepository.findById(facultyUserId)
                .orElseThrow( () -> new FacultyUserNotFoundException("FacultyUser not found"));
        return facultyUser.getUserId().equals(userId);
    }

    // find if user is admin
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

    public List<Answer> getPostResponses(Long postId) {
        List<Answer> answers = answerRepository.findByPostId(postId);
        return answers;
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
        post.setFacutlyUserId(facultyUser.getId());
        post.setSubjectId(postCreateDTO.getSubjectId());
        post.setUpvotes(0);
        post.setDownvotes(0);
        post.setReports(0);
        post.setActive(true);

        Post savedPost = postRepository.save(post);

        // Step 4: Upload images to Cloudinary and link to the post
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
}
