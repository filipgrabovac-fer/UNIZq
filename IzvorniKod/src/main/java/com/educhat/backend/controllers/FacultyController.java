package com.educhat.backend.controllers;

import com.educhat.backend.DTO.FacultiesAdminResponseDTO;
import com.educhat.backend.models.Faculty;
import com.educhat.backend.services.FacultyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculties")
@CrossOrigin("*")
public class FacultyController {

    private final FacultyService facultyService;

    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Faculty>> getAllFaculties() {
        List<Faculty> faculties = facultyService.getAllFaculties();
        return ResponseEntity.ok(faculties);
    }

    @GetMapping("/admin/{userId}")
    public ResponseEntity<List<FacultiesAdminResponseDTO>> getFacultiesWhereUserIsAdmin(@PathVariable Long userId) {
        List<FacultiesAdminResponseDTO> response = facultyService.getFacultiesWhereUserIsAdmin(userId);
        return ResponseEntity.ok(response);
    }

}
