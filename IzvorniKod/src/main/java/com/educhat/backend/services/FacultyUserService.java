package com.educhat.backend.services;

import com.educhat.backend.DTO.FacultyUserCreateDTO;
import com.educhat.backend.DTO.FacultyUserDTO;
import com.educhat.backend.DTO.FacultyYearDTO;
import com.educhat.backend.DTO.SelectedFacultiesDTO;
import com.educhat.backend.exceptions.FacultyNotFoundException;
import com.educhat.backend.exceptions.UserNotFoundException;
import com.educhat.backend.models.Faculty;
import com.educhat.backend.exceptions.FacultyUserNotFoundException;
import com.educhat.backend.models.FacultyUser;
import com.educhat.backend.models.FacultyYear;
import com.educhat.backend.models.User;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FacultyUserService {

    private final FacultyUserRepository facultyUserRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final FacultyRepository facultyRepository;
    private final FacultyYearRepository facultyYearRepository;

    public List<FacultyUserDTO> getNonAdminUsers(Long facultyId) {
        List<FacultyUser> facultyUsers = facultyUserRepository.findByFacultyIdAndRoleNot(facultyId, Role.ADMIN);

        return facultyUsers.stream().map(facultyUser -> {
            User user = userRepository.findById(facultyUser.getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            Integer postsReported = postRepository.sumReportsByFacultyUserId(facultyUser.getId());
            postsReported = postsReported != null ? postsReported : 0; // Handle null case

            FacultyUserDTO dto = new FacultyUserDTO();
            dto.setFacultyUserId(facultyUser.getId());
            dto.setUsername(user.getRealUsername());
            dto.setEmail(user.getEmail());
            dto.setPostsReported(postsReported);
            dto.setKicked(facultyUser.isKicked());
            return dto;
        }).collect(Collectors.toList());
    }

    public List<FacultyUser> createFacultyUser(Long userId, List<FacultyUserCreateDTO> facultyUserCreateDTOs) {
        // check if user exists
        if(!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found");
        }

        // list of all saved faculty users
        List<FacultyUser> savedFacultyUsers = new ArrayList<>();

        // iterate through all selected faculties
        for(FacultyUserCreateDTO dto : facultyUserCreateDTOs) {

            // check if faculty exists
            if(!facultyRepository.existsById(dto.getFacultyId())) {
                throw new FacultyNotFoundException("Faculty not found");
            }

            // already exist that faculty user
            Optional<FacultyUser> facultyUserOptional = facultyUserRepository.findByUserIdAndFacultyId(userId, dto.getFacultyId());
            if(facultyUserOptional.isPresent()) {
                FacultyUser facultyUser = facultyUserOptional.get();
                // if the role is different, update it
                if(!facultyUser.getRole().equals(dto.getUserRole())) {
                    facultyUser.setRole(dto.getUserRole());
                }
                // set isSelected to true
                facultyUser.setSelected(true);
                facultyUserRepository.save(facultyUser);
                savedFacultyUsers.add(facultyUser);

            // create new faculty user
            } else {
                FacultyUser facultyUser = new FacultyUser();
                facultyUser.setUserId(userId);
                facultyUser.setFacultyId(dto.getFacultyId());
                facultyUser.setRole(dto.getUserRole());
                facultyUser.setKicked(false);
                facultyUser.setSelected(true);

                facultyUserRepository.save(facultyUser);
                savedFacultyUsers.add(facultyUser);
            }
        }

        // for all faculties that user "deselected", set isSelected to false
        for(FacultyUser facultyUser : facultyUserRepository.findByUserId(userId)) {
            if(!savedFacultyUsers.contains(facultyUser)) {
                facultyUser.setSelected(false);
                facultyUserRepository.save(facultyUser);
            }
        }

        return savedFacultyUsers;
    }

    public List<SelectedFacultiesDTO> getSelectedFaculties(Long userId) {
        // find user if exist
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // initialize empty list - zero selected faculties
        List<SelectedFacultiesDTO> selectedFaculties = new ArrayList<>();

        // iterate through faculties user selected
        for (FacultyUser facultyUser : facultyUserRepository.findByUserId(userId)) {
            // if user is kicked from that faculty, don't show it
            if (facultyUser.isKicked()) continue;

            // param "soft delete" - if it is set to false don't show that facultyUser
            if (!facultyUser.isSelected()) continue;
            // find faculty
            Faculty faculty = facultyRepository.findById(facultyUser.getFacultyId())
                    .orElseThrow(() -> new FacultyNotFoundException("Faculty not found"));

            // find associated faculty years
            List<FacultyYearDTO> facultyYearDTOs = new ArrayList<>();
            for (FacultyYear facultyYear : facultyYearRepository.findByFacultyId(faculty.getId())) {
                facultyYearDTOs.add(new FacultyYearDTO(facultyYear.getId(), facultyYear.getTitle()));
            }

            // add created dto to list
            selectedFaculties.add(new SelectedFacultiesDTO(
                    faculty.getId(),
                    faculty.getTitle(),
                    facultyYearDTOs,
                    user.getRole().equals(Role.ADMIN),
                    facultyUser.getRole().equals(Role.ADMIN) || user.getRole().equals(Role.ADMIN)));
        }

        return selectedFaculties;
    }
    
    public boolean kickUserFromFaculty(Long facultyId, Long userId) {
        FacultyUser facultyUser = facultyUserRepository.findByFacultyIdAndUserId(facultyId, userId)
                .orElseThrow(() -> new FacultyUserNotFoundException("Faculty user not found for the specified faculty and user."));

        facultyUser.setKicked(!facultyUser.isKicked());

        facultyUserRepository.save(facultyUser);

        return true;
    }
}
