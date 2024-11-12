package com.educhat.backend.services;


import com.educhat.backend.DTO.UserLoginDTO;
import com.educhat.backend.DTO.UserRegistrationDTO;
import com.educhat.backend.auth.AuthenticationResponse;
import com.educhat.backend.exceptions.*;
import com.educhat.backend.models.User;
import com.educhat.backend.models.enums.LoginType;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.UserRepository;
import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

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
}
