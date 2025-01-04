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
public class PostCreateDTO {
    private String postHeader;
    private String postContent;
    private Long subjectId;
    private List<String> images;
    private String link;
    private Long facultyId;
}
