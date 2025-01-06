package com.educhat.backend.services;

import com.educhat.backend.DTO.FacultiesAdminResponseDTO;
import com.educhat.backend.exceptions.FacultyNotFoundException;
import com.educhat.backend.exceptions.UnauthorizedActionException;
import com.educhat.backend.exceptions.UserNotFoundException;
import com.educhat.backend.models.Faculty;
import com.educhat.backend.models.FacultyUser;
import com.educhat.backend.models.FacultyYear;
import com.educhat.backend.models.User;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.FacultyRepository;
import com.educhat.backend.repository.FacultyUserRepository;
import com.educhat.backend.repository.FacultyYearRepository;
import com.educhat.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
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
    private final FacultyYearRepository facultyYearRepository;
    private final FacultyYearService facultyYearService;

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

    public Faculty createFaculty(Long userId, String title) {
        // find user if exists
        User user = userRepository.findById(userId)
                .orElseThrow( () -> new UserNotFoundException("User not found"));

        // allow creation only if user is admin
        if(!user.getRole().equals(Role.ADMIN)) {
            throw new UnauthorizedActionException("User does not have permission to create a faculty");
        }

        // create and save new faculty
        Faculty faculty = new Faculty();
        faculty.setAppAdminId(userId);
        faculty.setTitle(title);
        return facultyRepository.save(faculty);
    }

    @Transactional
    public void deleteFacultyById(Long facultyId) {
        // find if faculty exists before deleting it
        if(!facultyRepository.existsById(facultyId)) {
            throw new FacultyNotFoundException("Faculty not found");
        }

        // delete all related data
        for(FacultyYear facultyYear : facultyYearRepository.findByFacultyId(facultyId)) {
            facultyYearService.deleteFacultyYearById(facultyYear.getId());
        }

        // delete faculty
        facultyRepository.deleteById(facultyId);
    }
}
