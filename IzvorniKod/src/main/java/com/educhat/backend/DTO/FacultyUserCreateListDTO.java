package com.educhat.backend.DTO;

import com.educhat.backend.models.enums.Role;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FacultyUserCreateListDTO {
    @NonNull
    private List<FacultyUserCreateDTO> facultyUserList;
}
