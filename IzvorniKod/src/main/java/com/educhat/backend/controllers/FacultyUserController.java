package com.educhat.backend.controllers;

import com.educhat.backend.services.FacultyUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/faculty-users")
@CrossOrigin("*")
@RequiredArgsConstructor
public class FacultyUserController {

    private final FacultyUserService facultyUserService;

    @PutMapping("/faculty/{facultyId}/kick/{userId}")
    public ResponseEntity<Boolean> kickFacultyUser(@PathVariable Long facultyId, @PathVariable Long userId) {
        boolean result = facultyUserService.kickUserFromFaculty(facultyId, userId);
        return ResponseEntity.ok(result);
    }

}
