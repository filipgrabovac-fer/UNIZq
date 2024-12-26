package com.educhat.backend.services;

import com.educhat.backend.DTO.FacultiesAdminResponseDTO;
import com.educhat.backend.exceptions.FacultyNotFoundException;
import com.educhat.backend.exceptions.UserNotFoundException;
import com.educhat.backend.models.Faculty;
import com.educhat.backend.models.FacultyUser;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.FacultyRepository;
import com.educhat.backend.repository.FacultyUserRepository;
import com.educhat.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FacultyService {

    private final FacultyRepository facultyRepository;
    private final UserRepository userRepository;
    private final FacultyUserRepository facultyUserRepository;

    public List<Faculty> getAllFaculties() {
        return facultyRepository.findAll();
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

}
