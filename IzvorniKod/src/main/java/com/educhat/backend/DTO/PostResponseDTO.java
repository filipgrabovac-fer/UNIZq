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
    private Long facutlyUserId;
    private Long subjectId;
    private int upvotes;
    private int downvotes;
    private int reports;
    private boolean active;
    private PostType type;
    private boolean isEditable; // korisnik moze editat/brisat post
}
