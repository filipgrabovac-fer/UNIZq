package com.educhat.backend.services;

import com.educhat.backend.DTO.PostResponseDTO;
import com.educhat.backend.exceptions.FacultyUserNotFoundException;
import com.educhat.backend.exceptions.FacultyYearNotFoundException;
import com.educhat.backend.exceptions.SubjectNotFoundException;
import com.educhat.backend.exceptions.UserNotFoundException;
import com.educhat.backend.models.*;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
                        post.getType(),
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

    
    private boolean isEditable(Post post, Long userId) {
        boolean isAuthor = false;
        boolean isAdmin = false;

        // find if user is the author of post
        Long facultyUserId = post.getFacutlyUserId();
        Optional<FacultyUser> facultyUserOptional = facultyUserRepository.findById(facultyUserId);
        if(facultyUserOptional.isPresent()) {
            FacultyUser facultyUser = facultyUserOptional.get();
            isAuthor = facultyUser.getUserId().equals(userId);
            //isAdmin = facultyUser.getRole().equals(Role.ADMIN);
        }

        // find if user is admin of faculty
        Long subjectId = post.getSubjectId();
        Optional<Subject> subjectOptional = subjectRepository.findById(subjectId);
        if(subjectOptional.isPresent()) {
            Subject subject = subjectOptional.get();
            Long facultyYearId = subject.getFacultyYearId();
            Optional<FacultyYear> facultyYearOptional = facultyYearRepository.findById(facultyYearId);
            if(facultyYearOptional.isPresent()) {
                FacultyYear facultyYear = facultyYearOptional.get();
                Long facultyId = facultyYear.getFacultyId();

                Optional<FacultyUser> furOptional = facultyUserRepository.findByUserIdAndFacultyId(userId, facultyId);
                if(furOptional.isPresent()) {
                    FacultyUser fu = furOptional.get();

                    isAdmin = fu.getRole().equals(Role.ADMIN);
                }
            }
        }

        return isAuthor || isAdmin;
    }




}
