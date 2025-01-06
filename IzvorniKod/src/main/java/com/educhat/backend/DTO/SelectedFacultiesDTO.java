package com.educhat.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SelectedFacultiesDTO {

    private Long facultyId;
    private String title;
    private List<FacultyYearDTO> facultyYears;
    private boolean canEditFaculty;
    private boolean canEditFacultyYear;
}
