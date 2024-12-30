package com.educhat.backend.services;


import com.educhat.backend.DTO.FacultyUserCreateDTO;
import com.educhat.backend.DTO.SelectedFacultiesDTO;
import com.educhat.backend.DTO.UserLoginDTO;
import com.educhat.backend.DTO.UserRegistrationDTO;
import com.educhat.backend.auth.AuthenticationResponse;
import com.educhat.backend.exceptions.*;
import com.educhat.backend.models.Faculty;
import com.educhat.backend.models.FacultyUser;
import com.educhat.backend.models.User;
import com.educhat.backend.models.enums.LoginType;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.*;
import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final FacultyUserRepository facultyUserRepository;
    private final FacultyRepository facultyRepository;
    private final AppAdminRepository appAdminRepository;
    private final FacultyYearRepository facultyYearRepository;

    public AuthenticationResponse saveUser(UserRegistrationDTO registrationDTO) {
        var user = User.builder()
                .username(registrationDTO.getUsername())
                .email(registrationDTO.getEmail())
                .password(passwordEncoder.encode(registrationDTO.getPassword()))
                .loginType(LoginType.CREDENTIALS)
                .role(Role.USER)
                .build();

        if(userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticateUser(UserLoginDTO userLoginDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userLoginDTO.getEmail()
                        , userLoginDTO.getPassword()
                )
        );
        var user = userRepository.findByEmail(userLoginDTO.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public List<FacultyUser> createFacultyUser(Long userId, List<FacultyUserCreateDTO> facultyUserCreateDTOs) {
        if(!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found");
        }
        List<FacultyUser> savedFacultyUsers = new ArrayList<>();

        for(FacultyUserCreateDTO dto : facultyUserCreateDTOs) {
            if(!facultyRepository.existsById(dto.getFacultyId())) {
                throw new FacultyNotFoundException("Faculty not found");
            }
            if(facultyUserRepository.existsByUserIdAndFacultyIdAndRole(userId, dto.getFacultyId(), dto.getUserRole())) {
                throw new FacultyUserAlreadyExistsException("User already selected faculty with id: " + dto.getFacultyId()
                        + " and role: " + dto.getUserRole());
            }

            FacultyUser facultyUser = new FacultyUser();
            facultyUser.setUserId(userId);
            facultyUser.setFacultyId(dto.getFacultyId());
            facultyUser.setRole(dto.getUserRole());
            facultyUser.setKicked(false);

            savedFacultyUsers.add(facultyUser);
        }
        facultyUserRepository.saveAll(savedFacultyUsers);

        return savedFacultyUsers;
    }
    public List<SelectedFacultiesDTO> getSelectedFaculties(Long userId) {
        if(!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found");
        }
        List<SelectedFacultiesDTO> selectedFacultiesDTOs = new ArrayList<>();
        List<Faculty> faculties = new ArrayList<>();
        if (appAdminRepository.existsByUserId(userId)) {
            faculties = facultyRepository.findAll();
            for (Faculty faculty : faculties) {
                SelectedFacultiesDTO selectedFacultiesDTO = new SelectedFacultiesDTO();
                selectedFacultiesDTO.setId(faculty.getId());
                selectedFacultiesDTO.setAppAdminId(faculty.getAppAdminId());
                selectedFacultiesDTO.setTitle(faculty.getTitle());
                selectedFacultiesDTO.setSelectedYears(facultyYearRepository.findByFacultyId(faculty.getId()));
                selectedFacultiesDTO.setRole(Role.ADMIN);
                selectedFacultiesDTOs.add(selectedFacultiesDTO);
            }

        } else {
            List<FacultyUser> facultyUsers = new ArrayList<>();
            facultyUsers = facultyUserRepository.findFacultyUsersByUserId(userId);
            List<Long> facultyIds = new ArrayList<>();
            for (FacultyUser facultyUser : facultyUsers) {
                Long id = facultyUser.getId();
                faculties.add(facultyRepository.findById(id).orElseThrow( () -> new FacultyNotFoundException("Faculty not found")));
                facultyIds.add(id);
            }

            Iterator<Faculty> facultyIterator = faculties.iterator();
            Iterator<Long> facultyIdIterator = facultyIds.iterator();
            while (facultyIterator.hasNext() && facultyIdIterator.hasNext()) {
                Faculty faculty = facultyIterator.next();
                Long facultyId = facultyIdIterator.next();
                SelectedFacultiesDTO selectedFacultiesDTO = new SelectedFacultiesDTO();
                selectedFacultiesDTO.setId(faculty.getId());
                selectedFacultiesDTO.setAppAdminId(faculty.getAppAdminId());
                selectedFacultiesDTO.setTitle(faculty.getTitle());
                selectedFacultiesDTO.setSelectedYears(facultyYearRepository.findByFacultyIdAndFacultyUserId(faculty.getId(),facultyId));
                selectedFacultiesDTO.setRole(Role.USER);
                selectedFacultiesDTOs.add(selectedFacultiesDTO);
            }


        }
        return selectedFacultiesDTOs;
    }

}
