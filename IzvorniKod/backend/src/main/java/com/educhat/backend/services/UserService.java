package com.educhat.backend.services;


import com.educhat.backend.exceptions.EmailAlreadyExistsException;
import com.educhat.backend.exceptions.InvalidCredentialsException;
import com.educhat.backend.exceptions.UserNotFoundException;
import com.educhat.backend.exceptions.UsernameAlreadyExistsException;
import com.educhat.backend.models.Faculty;
import com.educhat.backend.models.FacultyUser;
import com.educhat.backend.models.User;
import com.educhat.backend.models.UserLoginDTO;
import com.educhat.backend.repository.FacultyUserRepository;
import com.educhat.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final FacultyUserRepository facultyUserRepository;

    @Autowired
    public UserService(UserRepository userRepository, FacultyUserRepository facultyUserRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.facultyUserRepository = facultyUserRepository;
    }

    public User saveUser(User user) {
        if(userRepository.findByUsername(user.getUsername()) != null) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }
        if(userRepository.findByEmail(user.getEmail()) != null) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
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
        return user;
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public FacultyUser createFacultyUser(Long userId, Faculty faculty) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));
        FacultyUser facultyUser = new FacultyUser();
        facultyUser.setUser(user);
        facultyUser.setFaculty(faculty);
        return facultyUserRepository.save(facultyUser);
    }

}
