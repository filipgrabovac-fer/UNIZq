package com.educhat.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsDTO {

    private String username;
    private String email;
    private String imageUrl;
    private int numSelectedFaculties;
    private int numCreatedPosts;
    private int sumOfLikes; // number of likes on created posts

}
