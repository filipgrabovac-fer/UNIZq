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
public class Event {

    @Id
    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private Float longitude;

    @NotNull
    private Float latitude;

    @NotNull
    private Long facultyId;

    @NotNull
    private Long facultyUserId;
}
