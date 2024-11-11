package com.educhat.backend.services;


import com.educhat.backend.exceptions.*;
import com.educhat.backend.models.User;
import com.educhat.backend.models.enums.LoginType;
import com.educhat.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User saveUser(User user) {
        if(userRepository.findByUsername(user.getUsername()) != null) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }
        if(userRepository.findByEmail(user.getEmail()) != null) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
        user.setLoginType(LoginType.CREDENTIALS);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User authenticateUser(String usernameOrEmail, String rawPassword) {
        User user = userRepository.findByUsername(usernameOrEmail);
        if(user == null) {
            user = userRepository.findByEmail(usernameOrEmail);
        }
        if(user == null || !passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }
        if(user.getLoginType() != LoginType.CREDENTIALS) {
            throw new InvalidLoginTypeException("Invalid login type");
        }
        return user;
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}
