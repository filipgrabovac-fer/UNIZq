package com.educhat.backend.services;

import com.educhat.backend.DTO.AnswerWithImagesDTO;
import com.educhat.backend.DTO.PostCreateDTO;
import com.educhat.backend.DTO.PostDetailsAndAnswersDTO;
import com.educhat.backend.DTO.PostResponseDTO;
import com.educhat.backend.exceptions.*;
import com.educhat.backend.models.*;
import com.educhat.backend.models.enums.PostType;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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



    public PostDetailsAndAnswersDTO getPostResponses(Long postId) {
        // get post
        Post post = postRepository.findById(postId).orElseThrow( () -> new PostNotFoundException("Post not found"));

        // create main dto response
        PostDetailsAndAnswersDTO response = new PostDetailsAndAnswersDTO();
        response.setPostHeader(post.getTitle());
        response.setPostContent(post.getDescription());

        // find author username
        FacultyUser facultyUser = facultyUserRepository.findById(post.getFacutlyUserId())
                .orElseThrow(() -> new FacultyUserNotFoundException("FacultyUser not found"));
        User user = userRepository.findById(facultyUser.getUserId())
                .orElseThrow( () -> new UserNotFoundException("User not found"));
        response.setAuthor(user.getUsername());

        // post images
        List<String> postImagesUrl = new ArrayList<>();
        for(PostImage image : postImageRepository.findByPostId(postId)) {
            postImagesUrl.add(image.getLink());
        }
        response.setImages(postImagesUrl);

        // connect answers with images
        List<AnswerWithImagesDTO> answerAndImages = new ArrayList<>();
        for(Answer answer : answerRepository.findByPostId(postId)) {
            // set answer in dto
            AnswerWithImagesDTO temp = new AnswerWithImagesDTO();
            temp.setAnswer(answer);
            //set images in dto
            List<String> answerImagesUrl = new ArrayList<>();
            for(AnswerImage image : answerImageRepository.findByAnswerId(answer.getId())) {
                answerImagesUrl.add(image.getLink());
            }
            temp.setAnswerImages(answerImagesUrl);

            answerAndImages.add(temp);
        }
        response.setAnswers(answerAndImages);

        return response;
    }



    public Post createPostAndImages(Long userId, PostCreateDTO postCreateDTO) {
        if(!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found");
        }
        FacultyUser facultyUser = facultyUserRepository.findByUserIdAndFacultyId(userId, postCreateDTO.getFacultyId())
                .orElseThrow(() -> new FacultyUserNotFoundException("FacultyUser not found"));

        Post post = new Post();
        post.setTitle(postCreateDTO.getPostHeader());
        post.setDescription(postCreateDTO.getPostContent());
        post.setFacutlyUserId(facultyUser.getId());
        post.setSubjectId(postCreateDTO.getSubjectId());
        post.setLink(postCreateDTO.getLink());
        post.setUpvotes(0);
        post.setDownvotes(0);
        post.setReports(0);
        post.setActive(true);

        Post savedPost = postRepository.save(post);

        List<PostImage> postImagesForSave = new ArrayList<>();
        for(String url : postCreateDTO.getImages()) {
            PostImage postImage = new PostImage();
            postImage.setPostId(savedPost.getId());
            postImage.setLink(url);
            postImagesForSave.add(postImage);
        }
        postImageRepository.saveAll(postImagesForSave);

        return savedPost;
    }

}
