package com.educhat.backend.controllers;

import com.educhat.backend.models.FacultyAdminApplication;
import com.educhat.backend.services.FacultyAdminApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/faculty-admin-applications")
public class FacultyAdminApplicationController {

    private final FacultyAdminApplicationService facultyAdminApplicationService;

    public FacultyAdminApplicationController(FacultyAdminApplicationService facultyAdminApplicationService) {
        this.facultyAdminApplicationService = facultyAdminApplicationService;
    }

    // Endpoint to add an application (used by users)
    @PostMapping
    public ResponseEntity<FacultyAdminApplication> addApplication(@RequestBody FacultyAdminApplication application) {
        FacultyAdminApplication savedApplication = facultyAdminApplicationService.addApplication(application);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedApplication);
    }

    // Endpoint to edit application status (used by admins)
    @PutMapping("/{applicationId}/approve")
    public ResponseEntity<FacultyAdminApplication> approveApplication(
            @PathVariable Long applicationId,
            @RequestParam Long approverId
    ) {
        FacultyAdminApplication updatedApplication = facultyAdminApplicationService.approveApplication(applicationId, approverId);
        return ResponseEntity.ok(updatedApplication);
    }
}
