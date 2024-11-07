package com.educhat.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subject {
    @Id
    private Long id;

    @NotNull
    private Long facultyUserId;

    @NotNull
    private Long facultyYearId;

    @NotNull
    private String title;

    @NotNull
    private String description;

}