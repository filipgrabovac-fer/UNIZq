package com.educhat.backend.controllers;

import com.educhat.backend.DTO.*;
import com.educhat.backend.auth.AuthenticationResponse;
import com.educhat.backend.models.FacultyUser;
import com.educhat.backend.services.FacultyUserService;
import com.educhat.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;
    private final FacultyUserService facultyUserService;

    public UserController(UserService userService, FacultyUserService facultyUserService) {
        this.userService = userService;
        this.facultyUserService = facultyUserService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> registerUser(@RequestBody UserRegistrationDTO registrationDTO) {
        return ResponseEntity.ok(userService.saveUser(registrationDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginUser(@RequestBody UserLoginDTO userLoginDTO){
        return ResponseEntity.ok(userService.authenticateUser(userLoginDTO));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserDetailsDTO> getUserDetailsById(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserDetails(userId));
    }

    @PostMapping("/user/{userId}/selected-faculties")
    public ResponseEntity<List<FacultyUser>> addFacultyToProfile(
            @PathVariable Long userId,
            @RequestBody FacultyUserCreateListDTO facultyUserCreateList) {
        List<FacultyUser> createdFacultyUsers = facultyUserService.createFacultyUser(userId, facultyUserCreateList.getFacultyUserList());
        return ResponseEntity.ok(createdFacultyUsers);
    }

    @GetMapping("/selected-faculties/user/{userId}")
    public ResponseEntity<List<SelectedFacultiesDTO>> getSelectedFaculties(@PathVariable Long userId) {
        return ResponseEntity.ok(facultyUserService.getSelectedFaculties(userId));
    }

    @PutMapping("user/{userId}/update-email")
    public ResponseEntity<String> updateEmail(@PathVariable Long userId, @RequestBody UpdateEmailRequestDTO request) {
        userService.updateEmail(userId, request.getNewEmail());
        return ResponseEntity.ok("Email updated successfully.");
    }

    @PutMapping("user/{userId}/update-username")
    public ResponseEntity<String> updateUsername(@PathVariable Long userId, @RequestBody UpdateUsernameRequestDTO request) {
        userService.updateUsername(userId, request.getNewUsername());
        return ResponseEntity.ok("Username updated successfully.");
    }
    
}
