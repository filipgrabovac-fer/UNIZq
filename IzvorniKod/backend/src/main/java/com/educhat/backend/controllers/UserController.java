package com.educhat.backend.controllers;

import com.educhat.backend.models.UserLoginDTO;
import com.educhat.backend.models.UserRegistrationDTO;
import com.educhat.backend.services.UserService;
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
    public User registerUser(@RequestBody UserRegistrationDTO registrationDTO) {
        User user = new User();
        user.setUsername(registrationDTO.getUsername());
        user.setEmail(registrationDTO.getEmail());
        user.setPassword(registrationDTO.getPassword());
        return userService.saveUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody UserLoginDTO userLoginDTO){
        return userService.authenticateUser(userLoginDTO.getUsernameOrEmail(), userLoginDTO.getPassword());
    }

    @GetMapping("/user/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }
}
