package com.educhat.backend.DTO;


import com.educhat.backend.models.FacultyYear;
import com.educhat.backend.models.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SelectedFacultiesDTO {
    private Long id;
    private Long appAdminId;
    private String title;
    private List<FacultyYear> selectedYears;
    private Role role;

}