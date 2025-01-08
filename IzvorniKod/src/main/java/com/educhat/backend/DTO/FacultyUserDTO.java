package com.educhat.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FacultyUserDTO {
    private Long facultyUserId;
    private String username;
    private String email;
    private int postsReported; // Number of reports on posts
    private boolean isKicked;

}
