package com.educhat.backend.models;

import com.educhat.backend.models.enums.PostType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private Long facutlyUserId;

    @NotNull
    private Long subjectId;

    private String link;

    private int upvotes;
    private int downvotes;
    private int reports;
    private boolean active;

}
