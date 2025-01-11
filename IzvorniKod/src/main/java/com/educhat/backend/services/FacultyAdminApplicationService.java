package com.educhat.backend.services;

import com.educhat.backend.exceptions.ApplicationAlreadyApprovedException;
import com.educhat.backend.exceptions.ApplicationNotFoundException;
import com.educhat.backend.exceptions.UnauthorizedActionException;
import com.educhat.backend.exceptions.UserNotFoundException;
import com.educhat.backend.models.FacultyAdminApplication;
import com.educhat.backend.models.User;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.models.enums.Status;
import com.educhat.backend.repository.FacultyAdminApplicationRepository;
import com.educhat.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FacultyAdminApplicationService {

    private final FacultyAdminApplicationRepository facultyAdminApplicationRepository;
    private final UserRepository userRepository;

    public FacultyAdminApplication addApplication(FacultyAdminApplication application) {
        application.setStatus(Status.PENDING);
        application.setRole(Role.ADMIN);
        return facultyAdminApplicationRepository.save(application);
    }

    public FacultyAdminApplication approveApplication(Long applicationId, Long approverId) {
        // Ensure the approver is an admin
        User approver = userRepository.findById(approverId)
                .orElseThrow(() -> new UserNotFoundException("Approving user not found"));

        if (approver.getRole() != Role.ADMIN) {
            throw new UnauthorizedActionException("Only users with ADMIN privileges can approve applications");
        }

        // Find the application to approve
        FacultyAdminApplication application = facultyAdminApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ApplicationNotFoundException("Application not found"));

        if (application.getStatus() == Status.APPROVED) {
            throw new ApplicationAlreadyApprovedException("Application is already approved");
        }

        // Approve the application
        application.setStatus(Status.APPROVED);
        return facultyAdminApplicationRepository.save(application);
    }
}