package com.educhat.backend.controllers;

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

    @DeleteMapping("/{yearId}")
    public ResponseEntity<Void> deleteFacultyYear(@PathVariable Long yearId) {
        facultyYearService.deleteFacultyYearById(yearId);
        return ResponseEntity.noContent().build(); // HTTP 204 No Content
    }
}
