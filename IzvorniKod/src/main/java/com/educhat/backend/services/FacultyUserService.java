package com.educhat.backend.services;

import com.educhat.backend.DTO.FacultyUserDTO;
import com.educhat.backend.exceptions.FacultyUserNotFoundException;
import com.educhat.backend.models.FacultyUser;
import com.educhat.backend.models.User;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.FacultyUserRepository;
import com.educhat.backend.repository.PostRepository;
import com.educhat.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FacultyUserService {

    private final FacultyUserRepository facultyUserRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

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

    public boolean kickUserFromFaculty(Long facultyId, Long userId) {
        FacultyUser facultyUser = facultyUserRepository.findByFacultyIdAndUserId(facultyId, userId)
                .orElseThrow(() -> new FacultyUserNotFoundException("Faculty user not found for the specified faculty and user."));

        facultyUser.setKicked(!facultyUser.isKicked());

        facultyUserRepository.save(facultyUser);

        return true;
    }
}
