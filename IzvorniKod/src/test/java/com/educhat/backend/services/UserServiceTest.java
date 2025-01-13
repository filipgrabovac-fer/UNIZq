package com.educhat.backend.services;

import com.educhat.backend.DTO.UserDetailsDTO;
import com.educhat.backend.DTO.UserLoginDTO;
import com.educhat.backend.DTO.UserRegistrationDTO;
import com.educhat.backend.auth.AuthenticationResponse;
import com.educhat.backend.exceptions.EmailAlreadyExistsException;
import com.educhat.backend.exceptions.UserNotFoundException;
import com.educhat.backend.exceptions.UsernameAlreadyExistsException;
import com.educhat.backend.models.User;
import com.educhat.backend.models.enums.LoginType;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private FacultyUserRepository facultyUserRepository;
    @Mock
    private FacultyRepository facultyRepository;
    @Mock
    private PostRepository postRepository;
    @Mock
    private CustomUserDetailsService customUserDetailsService;
    @Mock
    private FacultyYearRepository facultyYearRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveUser_ShouldSaveUserAndReturnAuthenticationResponse() {
        UserRegistrationDTO registrationDTO = new UserRegistrationDTO();
        registrationDTO.setUsername("testuser");
        registrationDTO.setEmail("test@example.com");
        registrationDTO.setPassword("password");

        User user = User.builder()
                .username("testuser")
                .email("test@example.com")
                .password("encodedPassword")
                .loginType(LoginType.CREDENTIALS)
                .role(Role.USER)
                .build();

        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User savedUser = invocation.getArgument(0);
            savedUser.setId(1L); // Simulate setting the ID after saving
            return savedUser;
        });
        when(customUserDetailsService.loadUserByUsername(anyString())).thenReturn(mock(UserDetails.class));
        when(jwtService.generateToken(any(UserDetails.class), anyLong())).thenReturn("jwtToken");

        AuthenticationResponse response = userService.saveUser(registrationDTO);

        assertNotNull(response);
        assertEquals("jwtToken", response.getToken());
        verify(userRepository).save(any(User.class));
        verify(customUserDetailsService).loadUserByUsername(anyString());
        verify(jwtService).generateToken(any(UserDetails.class), anyLong());
    }

    @Test
    void authenticateUser_ShouldAuthenticateAndReturnAuthenticationResponse() {
        UserLoginDTO loginDTO = new UserLoginDTO();
        loginDTO.setEmail("test@example.com");
        loginDTO.setPassword("password");

        User user = User.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .password("encodedPassword")
                .loginType(LoginType.CREDENTIALS)
                .role(Role.USER)
                .build();

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(customUserDetailsService.loadUserByUsername(anyString())).thenReturn(mock(UserDetails.class));
        when(jwtService.generateToken(any(UserDetails.class), anyLong())).thenReturn("jwtToken");

        AuthenticationResponse response = userService.authenticateUser(loginDTO);

        assertNotNull(response);
        assertEquals("jwtToken", response.getToken());
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findByEmail(anyString());
        verify(customUserDetailsService).loadUserByUsername(anyString());
        verify(jwtService).generateToken(any(UserDetails.class), anyLong());
    }

    @Test
    void updateEmail_ShouldUpdateEmail() {
        Long userId = 1L;
        String newEmail = "newemail@example.com";
        User user = User.builder()
                .id(userId)
                .email("oldemail@example.com")
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        userService.updateEmail(userId, newEmail);
        assertEquals(newEmail, user.getEmail());
        verify(userRepository).save(user);
    }

    @Test
    void updateEmail_ShouldThrowException_WhenUserNotFound() {
        Long userId = 1L;
        String newEmail = "newemail@example.com";

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.updateEmail(userId, newEmail));
    }

    @Test
    void testUpdateUsername_Success() {
        // Arrange
        Long userId = 1L;
        String newUsername = "newUsername";
        User existingUser = new User();
        existingUser.setId(userId);
        existingUser.setUsername("oldUsername");

        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));

        // Act
        userService.updateUsername(userId, newUsername);

        // Assert
        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).save(existingUser);
        assert existingUser.getRealUsername().equals(newUsername);
    }

    @Test
    void testUpdateUsername_UserNotFound() {
        // Arrange
        Long userId = 1L;
        String newUsername = "newUsername";

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UserNotFoundException.class, () -> userService.updateUsername(userId, newUsername));
        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void updateUsername_ShouldThrowException_WhenUserNotFound() {
        Long userId = 1L;
        String newUsername = "newusername";

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.updateUsername(userId, newUsername));
    }
}
