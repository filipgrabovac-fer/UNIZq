package com.educhat.backend.models;

import com.educhat.backend.models.enums.PostType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private PostType type;
}
