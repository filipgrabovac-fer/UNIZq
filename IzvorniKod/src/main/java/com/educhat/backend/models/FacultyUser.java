package com.educhat.backend.models;

import com.educhat.backend.models.enums.Role;
import jakarta.persistence.*;
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
    @Enumerated(EnumType.STRING)
    private Role role;

    @NotNull
    private boolean kicked;

    @NotNull
    private boolean isSelected;
  
}
