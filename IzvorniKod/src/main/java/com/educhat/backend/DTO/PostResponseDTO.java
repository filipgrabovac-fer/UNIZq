package com.educhat.backend.DTO;

import com.educhat.backend.models.enums.PostType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostResponseDTO {
    private Long id;
    private String title;
    private String description;
    private Long facultyUserId;
    private Long subjectId;
    private boolean userUpvoted;
    private boolean userDownvoted;
    private boolean active;
    private boolean isEditable;
}
