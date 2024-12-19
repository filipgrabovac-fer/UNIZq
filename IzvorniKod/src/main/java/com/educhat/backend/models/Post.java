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
    private int upvotes;
    private int downvotes;
    private int reports;
    private boolean active;

    @NotNull
    @Enumerated(EnumType.STRING)
    private PostType type;
}
