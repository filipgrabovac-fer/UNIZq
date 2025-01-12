package com.educhat.backend.models;

import com.educhat.backend.models.enums.Role;
import com.educhat.backend.models.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class FacultyAdminApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long userId;

    @NotNull
    private Long facultyId;

    @NotNull
    private String facultyTitle;

    @NotNull
    private String email;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Status status;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Role role;
}
