package com.educhat.backend.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventDTO {
    private String title;
    private String description;
    private Float longitude;
    private Float latitude;
    private Long facultyId;
    private Long facultyUserId;
}
