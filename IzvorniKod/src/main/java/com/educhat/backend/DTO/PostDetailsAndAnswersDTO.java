package com.educhat.backend.DTO;

import com.educhat.backend.models.Answer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDetailsAndAnswersDTO {

    private String postHeader;
    private String postContent;
    private String author;  // username
    private List<String> images;    // list of images urls connected to that post
    private List<AnswerWithImagesDTO> answers;
}
