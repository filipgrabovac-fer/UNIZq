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
public class AnswerWithImagesDTO {

    private Answer answer;
    private List<String> answerImages; // list of images urls connected to that answer

}
