package com.educhat.backend.controllers;

import com.educhat.backend.DTO.AllFacultiesDTO;
import com.educhat.backend.DTO.CreateFacultyDTO;
import com.educhat.backend.DTO.FacultiesAdminResponseDTO;
import com.educhat.backend.DTO.FacultyUserDTO;
import com.educhat.backend.models.Faculty;
import com.educhat.backend.services.FacultyService;
import com.educhat.backend.services.FacultyUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculties")
@CrossOrigin("*")
public class FacultyController {

    private final FacultyService facultyService;
    private final FacultyUserService facultyUserService;

    public FacultyController(FacultyService facultyService, FacultyUserService facultyUserService) {
        this.facultyService = facultyService;
        this.facultyUserService = facultyUserService;
    }

    @GetMapping("/all/user/{userId}")
    public ResponseEntity<List<AllFacultiesDTO>> getAllFaculties(@PathVariable Long userId) {
        List<AllFacultiesDTO> faculties = facultyService.getAllFaculties(userId);
        return ResponseEntity.ok(faculties);
    }

    @GetMapping("/admin/{userId}")
    public ResponseEntity<List<FacultiesAdminResponseDTO>> getFacultiesWhereUserIsAdmin(@PathVariable Long userId) {
        List<FacultiesAdminResponseDTO> response = facultyService.getFacultiesWhereUserIsAdmin(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{facultyId}/users/all")
    public ResponseEntity<List<FacultyUserDTO>> getNonAdminUsers(@PathVariable Long facultyId) {
        List<FacultyUserDTO> users = facultyUserService.getNonAdminUsers(facultyId);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Faculty> createFaculty(@PathVariable Long userId, @RequestBody CreateFacultyDTO body) {
        Faculty createdFaculty = facultyService.createFaculty(userId, body.getTitle());
        return ResponseEntity.ok(createdFaculty);
    }

    @DeleteMapping("/{facultyId}/user/{userId}")
    public ResponseEntity<Boolean> deleteFaculty(@PathVariable Long facultyId, @PathVariable Long userId) {
        facultyService.deleteFacultyById(facultyId, userId);
        return ResponseEntity.ok(true); // HTTP 204 No Content
    }

}
