package com.educhat.backend.controllers;

import com.educhat.backend.DTO.*;
import com.educhat.backend.auth.AuthenticationResponse;
import com.educhat.backend.exceptions.EmailAlreadyExistsException;
import com.educhat.backend.exceptions.FacultyUserNotFoundException;
import com.educhat.backend.exceptions.UserNotFoundException;
import com.educhat.backend.exceptions.UsernameAlreadyExistsException;
import com.educhat.backend.models.FacultyUser;
import com.educhat.backend.services.FacultyUserService;
import com.educhat.backend.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

public class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private FacultyUserService facultyUserService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRegisterUser() {
        UserRegistrationDTO registrationDTO = new UserRegistrationDTO();
        AuthenticationResponse response = new AuthenticationResponse();
        when(userService.saveUser(any(UserRegistrationDTO.class))).thenReturn(response);

        ResponseEntity<AuthenticationResponse> result = userController.registerUser(registrationDTO);

        assertEquals(ResponseEntity.ok(response), result);
    }

    @Test
    public void testLoginUser() {
        UserLoginDTO userLoginDTO = new UserLoginDTO();
        AuthenticationResponse response = new AuthenticationResponse();
        when(userService.authenticateUser(any(UserLoginDTO.class))).thenReturn(response);

        ResponseEntity<AuthenticationResponse> result = userController.loginUser(userLoginDTO);

        assertEquals(ResponseEntity.ok(response), result);
    }

    @Test
    public void testGetUserDetailsById() {
        Long userId = 1L;
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        when(userService.getUserDetails(userId)).thenReturn(userDetailsDTO);

        ResponseEntity<UserDetailsDTO> result = userController.getUserDetailsById(userId);

        assertEquals(ResponseEntity.ok(userDetailsDTO), result);
    }

    @Test
    public void testAddFacultyToProfile() {
        Long userId = 1L;
        FacultyUserCreateListDTO facultyUserCreateList = new FacultyUserCreateListDTO();
        List<FacultyUser> facultyUsers = List.of(new FacultyUser());
        when(facultyUserService.createFacultyUser(userId, facultyUserCreateList.getFacultyUserList())).thenReturn(facultyUsers);

        ResponseEntity<List<FacultyUser>> result = userController.addFacultyToProfile(userId, facultyUserCreateList);

        assertEquals(ResponseEntity.ok(facultyUsers), result);
    }

    @Test
    public void testGetSelectedFaculties() {
        Long userId = 1L;
        List<SelectedFacultiesDTO> selectedFaculties = List.of(new SelectedFacultiesDTO());
        when(facultyUserService.getSelectedFaculties(userId)).thenReturn(selectedFaculties);

        ResponseEntity<List<SelectedFacultiesDTO>> result = userController.getSelectedFaculties(userId);

        assertEquals(ResponseEntity.ok(selectedFaculties), result);
    }

    @Test
    public void testUpdateEmail() {
        Long userId = 1L;
        UpdateEmailRequestDTO request = new UpdateEmailRequestDTO();
        request.setNewEmail("newemail@example.com");

        ResponseEntity<String> result = userController.updateEmail(userId, request);

        assertEquals(ResponseEntity.ok("Email updated successfully."), result);
    }

    @Test
    public void testUpdateUsername() {
        Long userId = 1L;
        UpdateUsernameRequestDTO request = new UpdateUsernameRequestDTO();
        request.setNewUsername("newusername");

        ResponseEntity<String> result = userController.updateUsername(userId, request);

        assertEquals(ResponseEntity.ok("Username updated successfully."), result);
    }

    @Test
    void testRegisterUser_UsernameAlreadyExists() {
        UserRegistrationDTO registrationDTO = new UserRegistrationDTO();
        registrationDTO.setUsername("existingUser");
        when(userService.saveUser(any(UserRegistrationDTO.class)))
                .thenThrow(new UsernameAlreadyExistsException("Username already exists"));

        Exception exception = assertThrows(UsernameAlreadyExistsException.class, () ->
                userController.registerUser(registrationDTO));

        assertEquals("Username already exists", exception.getMessage());
    }

    @Test
    void testRegisterUser_EmailAlreadyExists() {
        UserRegistrationDTO registrationDTO = new UserRegistrationDTO();
        registrationDTO.setEmail("existing@example.com");
        when(userService.saveUser(any(UserRegistrationDTO.class)))
                .thenThrow(new EmailAlreadyExistsException("Email already exists"));

        Exception exception = assertThrows(EmailAlreadyExistsException.class, () ->
                userController.registerUser(registrationDTO));

        assertEquals("Email already exists", exception.getMessage());
    }

    @Test
    void testLoginUser_UserNotFound() {
        UserLoginDTO userLoginDTO = new UserLoginDTO();
        userLoginDTO.setEmail("nonexistent@example.com");
        when(userService.authenticateUser(any(UserLoginDTO.class)))
                .thenThrow(new UserNotFoundException("User not found"));

        Exception exception = assertThrows(UserNotFoundException.class, () ->
                userController.loginUser(userLoginDTO));

        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void testGetUserDetailsById_UserNotFound() {
        Long userId = 99L;
        when(userService.getUserDetails(userId)).thenThrow(new UserNotFoundException("User not found"));

        Exception exception = assertThrows(UserNotFoundException.class, () ->
                userController.getUserDetailsById(userId));

        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void testAddFacultyToProfile_FacultyUserNotFound() {
        Long userId = 1L;
        FacultyUserCreateListDTO facultyUserCreateList = new FacultyUserCreateListDTO();
        when(facultyUserService.createFacultyUser(userId, facultyUserCreateList.getFacultyUserList()))
                .thenThrow(new FacultyUserNotFoundException("Faculty user not found"));

        Exception exception = assertThrows(FacultyUserNotFoundException.class, () ->
                userController.addFacultyToProfile(userId, facultyUserCreateList));

        assertEquals("Faculty user not found", exception.getMessage());
    }

    @Test
    void testUpdateEmail_UserNotFound() {
        Long userId = 1L;
        UpdateEmailRequestDTO request = new UpdateEmailRequestDTO();
        request.setNewEmail("newemail@example.com");
        doThrow(new UserNotFoundException("User not found with ID: " + userId))
                .when(userService).updateEmail(userId, request.getNewEmail());

        Exception exception = assertThrows(UserNotFoundException.class, () ->
                userController.updateEmail(userId, request));

        assertEquals("User not found with ID: " + userId, exception.getMessage());
    }

    @Test
    void testUpdateUsername_UserNotFound() {
        Long userId = 1L;
        UpdateUsernameRequestDTO request = new UpdateUsernameRequestDTO();
        request.setNewUsername("newusername");
        doThrow(new UserNotFoundException("User not found with ID: " + userId))
                .when(userService).updateUsername(userId, request.getNewUsername());

        Exception exception = assertThrows(UserNotFoundException.class, () ->
                userController.updateUsername(userId, request));

        assertEquals("User not found with ID: " + userId, exception.getMessage());
    }


}