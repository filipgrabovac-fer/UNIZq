package com.educhat.backend.services;


import com.educhat.backend.DTO.*;
import com.educhat.backend.auth.AuthenticationResponse;
import com.educhat.backend.exceptions.*;
import com.educhat.backend.models.*;
import com.educhat.backend.models.enums.LoginType;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.*;
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
    private final CustomUserDetailsService customUserDetailsService;
    private final FacultyYearRepository facultyYearRepository;


    public AuthenticationResponse saveUser(UserRegistrationDTO registrationDTO) {
        var user = User.builder()
                .username(registrationDTO.getUsername())
                .email(registrationDTO.getEmail())
                .password(passwordEncoder.encode(registrationDTO.getPassword()))
                .loginType(LoginType.CREDENTIALS)
                .role(Role.USER)
                .build();

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
        user = userRepository.save(user); // Save user and get the persisted user with ID

        var userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());
        var jwtToken = jwtService.generateToken(userDetails, user.getId()); // Pass userId to generateToken

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticateUser(UserLoginDTO userLoginDTO) {
        // Authenticate the user credentials
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userLoginDTO.getEmail(),
                        userLoginDTO.getPassword()
                )
        );

        // Find the user from the database
        var user = userRepository.findByEmail(userLoginDTO.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // Load UserDetails
        var userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());

        // Generate the token with userId
        var jwtToken = jwtService.generateToken(userDetails, user.getId());

        // Return the response with the token
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

        return new UserDetailsDTO(user.getRealUsername(), user.getEmail(), user.getImageUrl(), numFaculties, numPosts, numLikes);
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

    public List<SelectedFacultiesDTO> selectedFaculties(Long userId) {
        // find user if exist
        User user = userRepository.findById(userId)
                .orElseThrow( () -> new UserNotFoundException("User not found"));

        // initialize empty list - zero selected faculties
        List<SelectedFacultiesDTO> selectedFaculties = new ArrayList<>();

        // iterate through faculties user selected
        for(FacultyUser facultyUser : facultyUserRepository.findByUserId(userId)) {
            // if user is kicked from that faculty, don't show it
            if(facultyUser.isKicked()) continue;

            // find faculty
            Faculty faculty = facultyRepository.findById(facultyUser.getFacultyId())
                    .orElseThrow( () -> new FacultyNotFoundException("Faculty not found"));

            // find associated faculty years
            List<FacultyYearDTO> facultyYearDTOs = new ArrayList<>();
            for(FacultyYear facultyYear : facultyYearRepository.findByFacultyId(faculty.getId())) {
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
}
