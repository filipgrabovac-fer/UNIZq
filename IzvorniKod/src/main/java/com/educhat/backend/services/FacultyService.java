package com.educhat.backend.services;

import com.educhat.backend.DTO.AllFacultiesDTO;
import com.educhat.backend.DTO.FacultiesAdminResponseDTO;
import com.educhat.backend.exceptions.FacultyNotFoundException;
import com.educhat.backend.exceptions.FacultyUserNotFoundException;
import com.educhat.backend.exceptions.UnauthorizedActionException;
import com.educhat.backend.exceptions.UserNotFoundException;
import com.educhat.backend.models.*;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FacultyService {

    private final FacultyYearRepository facultyYearRepository;
    private final SubjectRepository subjectRepository;
    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;
    private final AnswerRepository answerRepository;
    private final AnswerImageRepository answerImageRepository;
    private final UserRepository userRepository;
    private final FacultyUserRepository facultyUserRepository;
    private final FacultyRepository facultyRepository;
    private final CloudinaryService cloudinaryService;

    public List<AllFacultiesDTO> getAllFaculties(Long userId) {
        // find user if exists
        User user = userRepository.findById(userId)
                .orElseThrow( () -> new UserNotFoundException("User not found"));
        boolean appAdmin = user.getRole().equals(Role.ADMIN);

        // create return dto
        List<AllFacultiesDTO> facultiesDTO = new ArrayList<>();

        for (Faculty faculty : facultyRepository.findAll()) {
            // fetch the faculty user only if user is not an admin
            FacultyUser facultyUser = null;
            if (!appAdmin) {
                facultyUser = facultyUserRepository.findByUserIdAndFacultyId(userId, faculty.getId()).orElse(null);
            }

            // determine role based on user role and faculty user existence
            Role role;
            if (appAdmin) {
                role = Role.ADMIN;
            } else {
                if (facultyUser != null) {
                    role = facultyUser.getRole();
                } else {
                    role = null;
                }
            }

            facultiesDTO.add(new AllFacultiesDTO(faculty.getTitle(), role, faculty.getId()));
        }
        return facultiesDTO;
    }

    public List<FacultiesAdminResponseDTO> getFacultiesWhereUserIsAdmin(Long userId) {
        if(!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found");
        }
        List<FacultyUser> facultyUsers = facultyUserRepository.findByUserIdAndRole(userId, Role.ADMIN);
        List<FacultiesAdminResponseDTO> responseDTOs = new ArrayList<>();

        for(FacultyUser fu : facultyUsers) {
            Faculty faculty = facultyRepository.findById(fu.getFacultyId())
                    .orElseThrow( () -> new FacultyNotFoundException("Faculty not found"));
            responseDTOs.add(new FacultiesAdminResponseDTO(faculty.getId(), faculty.getTitle()));
        }
        return responseDTOs;
    }

    public Faculty createFaculty(Long userId, String title) {
        // find user if exists
        User user = userRepository.findById(userId)
                .orElseThrow( () -> new UserNotFoundException("User not found"));

        // check if user is app admin
        if(!user.getRole().equals(Role.ADMIN)) {
            throw new UnauthorizedActionException("User does not have permission to create a faculty");
        }

        // create and save new faculty
        Faculty faculty = new Faculty();
        faculty.setAppAdminId(userId);
        faculty.setTitle(title);
        Faculty savedFaculty = facultyRepository.save(faculty);

        // for all app admins create facultyUser with role ADMIN
        for(User u : userRepository.findByRole(Role.ADMIN)) {
            FacultyUser facultyUser = new FacultyUser();
            facultyUser.setUserId(u.getId());
            facultyUser.setFacultyId(savedFaculty.getId());
            facultyUser.setRole(Role.ADMIN);
            facultyUser.setKicked(false);
            facultyUser.setSelected(true);
            facultyUserRepository.save(facultyUser);
        }

        return savedFaculty;
    }

    @Transactional
    public void deleteFacultyById(Long facultyId, Long userId) {
        // find user if exists
        User user = userRepository.findById(userId)
                .orElseThrow( () -> new UserNotFoundException("User not found"));

        // find if faculty exists before deleting it
        if(!facultyRepository.existsById(facultyId)) {
            throw new FacultyNotFoundException("Faculty not found");
        }

        // check if user is app admin
        if(!user.getRole().equals(Role.ADMIN)) {
            throw new UnauthorizedActionException("User does not have permission to delete a faculty");
        }
        facultyUserRepository.deleteByFacultyId(facultyId);
        // delete all related data
        for(FacultyYear facultyYear : facultyYearRepository.findByFacultyId(facultyId)) {

            for(Subject subject : subjectRepository.findByFacultyYearId(facultyYear.getId())) {

                for(Post post : postRepository.findBySubjectId(subject.getId())) {
                    // delete all post images
                    for (PostImage postImage : postImageRepository.findByPostId(post.getId())) {
                        try {
                            cloudinaryService.deleteFile(postImage.getLink());
                        } catch (IOException e) {
                            throw new RuntimeException("Failed to delete image: " + e.getMessage());
                        }
                    }
                    postImageRepository.deleteByPostId(post.getId());

                    for(Answer answer : answerRepository.findByPostId(post.getId())) {
                        // delete all answer images
                        for (AnswerImage answerImage : answerImageRepository.findByAnswerId(answer.getId())) {
                            try {
                                cloudinaryService.deleteFile(answerImage.getLink());
                            } catch (IOException e) {
                                throw new RuntimeException("Failed to delete image: " + e.getMessage());
                            }
                        }
                        answerImageRepository.deleteByAnswerId(answer.getId());
                    }
                    // delete all answers
                    answerRepository.deleteByPostId(post.getId());
                }
                // delete all posts
                postRepository.deleteBySubjectId(subject.getId());
            }
            // delete all subjects
            subjectRepository.deleteByFacultyYearId(facultyYear.getId());
        }
        // delete faculty year
        facultyYearRepository.deleteByFacultyId(facultyId);

        // delete faculty
        facultyRepository.deleteById(facultyId);
    }

}
