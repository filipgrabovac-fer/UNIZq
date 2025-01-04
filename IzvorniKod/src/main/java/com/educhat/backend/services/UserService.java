package com.educhat.backend.services;


import com.educhat.backend.DTO.FacultyUserCreateDTO;
import com.educhat.backend.DTO.UserDetailsDTO;
import com.educhat.backend.DTO.UserLoginDTO;
import com.educhat.backend.DTO.UserRegistrationDTO;
import com.educhat.backend.auth.AuthenticationResponse;
import com.educhat.backend.exceptions.*;
import com.educhat.backend.models.Faculty;
import com.educhat.backend.models.FacultyUser;
import com.educhat.backend.models.Post;
import com.educhat.backend.models.User;
import com.educhat.backend.models.enums.LoginType;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.FacultyRepository;
import com.educhat.backend.repository.FacultyUserRepository;
import com.educhat.backend.repository.PostRepository;
import com.educhat.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final FacultyUserRepository facultyUserRepository;
    private final FacultyRepository facultyRepository;
    private final PostRepository postRepository;

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

    public UserDetailsDTO getUserDetails(Long userId) {
        // find user if exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // find number of posts that user created, number of likes (upvotes), number of faculties user follow
        int numPosts = 0;
        int numLikes = 0;
        int numFaculties = 0;
        for(FacultyUser facultyUser : facultyUserRepository.findByUserId(userId)) {
            numFaculties++;
            for(Post post : postRepository.findByFacultyUserId(facultyUser.getId())) {
                numPosts++;
                numLikes += post.getUpvotes();
            }
        }

        return new UserDetailsDTO(user.getRealUsername(), user.getEmail(), numFaculties, numPosts, numLikes);
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

}
