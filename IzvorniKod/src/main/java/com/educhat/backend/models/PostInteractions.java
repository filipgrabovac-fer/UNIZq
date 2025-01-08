package com.educhat.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostInteractions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long postId;

    private Long facultyUserId;

    private boolean liked;

    private boolean upvoted;

    private boolean downvoted;

    private boolean reported;

    public PostInteractions(Long postId, Long facultyUserId) {
        this.postId = postId;
        this.facultyUserId = facultyUserId;
        this.liked = false;
        this.upvoted = false;
        this.downvoted = false;
        this.reported = false;
    }
}
