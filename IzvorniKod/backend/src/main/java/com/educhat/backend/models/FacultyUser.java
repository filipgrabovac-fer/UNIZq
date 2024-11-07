package com.educhat.backend.models;

import com.educhat.backend.models.enums.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class FacultyUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long facultyId;

    @NotNull
    private Long userId;

    @NotNull
    private Role role;

    @NotNull
    private boolean kicked;
}
