package com.educhat.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class AnswerInteractions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long answerId;

    private Long facultyUserId;

    private boolean upvoted;

    private boolean downvoted;

    private boolean reported;


    public AnswerInteractions(Long answerId, Long facultyUserId) {
        this.answerId = answerId;
        this.facultyUserId = facultyUserId;
        this.upvoted = false;
        this.downvoted = false;
        this.reported = false;
    }
}
