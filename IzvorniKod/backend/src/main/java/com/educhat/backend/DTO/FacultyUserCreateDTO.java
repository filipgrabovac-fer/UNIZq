package com.educhat.backend.DTO;

import com.educhat.backend.models.enums.Role;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FacultyUserCreateDTO {
    @NonNull
    private Long facultyId;

    @NonNull
    private Role userRole;
}
