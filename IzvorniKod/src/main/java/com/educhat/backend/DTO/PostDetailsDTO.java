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
public class PostDetailsDTO {

    private String postHeader;
    private String postContent;
    private String author;  // username
    private int upvotes;
    private int downvotes;
    private int reports;
    private List<String> images;    // list of images url connected to that post
    private boolean isEditable; // true if current user is author of post
    private List<AnswerDetailsDTO> answerDetails;
}
