package com.educhat.backend.services;

import com.educhat.backend.exceptions.*;
import com.educhat.backend.models.*;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FacultyYearService {

    private final FacultyYearRepository facultyYearRepository;
    private final SubjectRepository subjectRepository;
    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;
    private final AnswerRepository answerRepository;
    private final AnswerImageRepository answerImageRepository;
    private final UserRepository userRepository;
    private final FacultyUserRepository facultyUserRepository;
    private final FacultyRepository facultyRepository;


    public FacultyYear createFacultyYear(Long userId, Long facultyId, String title) {
        // find user if exists
        User user = userRepository.findById(userId)
                .orElseThrow( () -> new UserNotFoundException("User not found"));

        // check if faculty exists
        if(!facultyRepository.existsById(facultyId)) {
            throw new FacultyNotFoundException("Faculty not found");
        }

        // user have to be subscribed to faculty and be admin in order to create year
        FacultyUser facultyUser = facultyUserRepository.findByUserIdAndFacultyId(userId,facultyId)
                .orElseThrow( () -> new FacultyUserNotFoundException("Faculty user not found"));
        if(!(user.getRole().equals(Role.ADMIN) || facultyUser.getRole().equals(Role.ADMIN))) {
            throw new UnauthorizedActionException("User does not have permission to create a faculty year");
        }

        // create and save new year
        FacultyYear facultyYear = new FacultyYear();
        facultyYear.setFacultyUserId(facultyUser.getId());
        facultyYear.setFacultyId(facultyId);
        facultyYear.setTitle(title);
        return facultyYearRepository.save(facultyYear);
    }

    @Transactional
    public void deleteFacultyYearById(Long yearId, Long userId) {
        // find user if exists
        User user = userRepository.findById(userId)
                .orElseThrow( () -> new UserNotFoundException("User not found"));

        // find faculty year if exists before deleting it
        FacultyYear facultyYear =  facultyYearRepository.findById(yearId)
                .orElseThrow( () -> new FacultyYearNotFoundException("Faculty year not found"));


        // user have to be subscribed to faculty and be admin in order to delete year
        FacultyUser facultyUser = facultyUserRepository.findByUserIdAndFacultyId(userId,facultyYear.getFacultyId())
                .orElseThrow( () -> new FacultyUserNotFoundException("Faculty user not found"));
        if(!(user.getRole().equals(Role.ADMIN) || facultyUser.getRole().equals(Role.ADMIN))) {
            throw new UnauthorizedActionException("User does not have permission to delete a faculty year");
        }

        for(Subject subject : subjectRepository.findByFacultyYearId(yearId)) {

            for(Post post : postRepository.findBySubjectId(subject.getId())) {
                // delete all post images
                postImageRepository.deleteByPostId(post.getId());

                for(Answer answer : answerRepository.findByPostId(post.getId())) {
                    // delete all answer images
                    answerImageRepository.deleteByAnswerId(answer.getId());
                }
                // delete all answers
                answerRepository.deleteByPostId(post.getId());
            }
            // delete all posts
            postRepository.deleteBySubjectId(subject.getId());
        }
        // delete all subjects
        subjectRepository.deleteByFacultyYearId(yearId);

        // delete faculty year
        facultyYearRepository.deleteById(yearId);
    }

}
