package com.educhat.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDetailsDTO {

    private String content;
    private List<String> answerImages; // list of images url connected to that answer
    private String author;
    private boolean isEditable;
    private boolean isUpvoted;
    private boolean isDownvoted;
    private boolean isLiked;

}
