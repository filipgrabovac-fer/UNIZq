package com.educhat.backend.DTO;

import com.educhat.backend.models.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AllFacultiesDTO {

    private String facultyName;
    private Role userRole;
    private Long facultyId;
    private Boolean isSelected;

}
