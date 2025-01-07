package com.educhat.backend.controllers;

import com.educhat.backend.models.Faculty;
import com.educhat.backend.models.FacultyYear;
import com.educhat.backend.services.FacultyYearService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/faculty-years")
@CrossOrigin("*")
public class FacultyYearController {

    private final FacultyYearService facultyYearService;

    public FacultyYearController(FacultyYearService facultyYearService) {
        this.facultyYearService = facultyYearService;
    }

    @PostMapping("/faculty/{facultyId}/user/{userId}")
    public ResponseEntity<FacultyYear> createFacultyYear(
            @PathVariable Long userId,
            @PathVariable Long facultyId,
            @RequestParam String title) {
        FacultyYear createdFacultyYear = facultyYearService.createFacultyYear(userId, facultyId, title);
        return ResponseEntity.ok(createdFacultyYear);
    }

    @DeleteMapping("/{yearId}/user/{userId}")
    public ResponseEntity<Void> deleteFacultyYear(@PathVariable Long yearId, @PathVariable Long userId) {
        facultyYearService.deleteFacultyYearById(yearId, userId);
        return ResponseEntity.noContent().build(); // HTTP 204 No Content
    }
}
