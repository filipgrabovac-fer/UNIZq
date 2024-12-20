package com.educhat.backend.controllers;

import com.educhat.backend.DTO.UserLoginDTO;
import com.educhat.backend.DTO.UserRegistrationDTO;
import com.educhat.backend.auth.AuthenticationResponse;
import com.educhat.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import com.educhat.backend.models.User;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }
}
