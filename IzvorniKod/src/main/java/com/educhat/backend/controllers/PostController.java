package com.educhat.backend.controllers;

import com.educhat.backend.DTO.PostCreateDTO;
import com.educhat.backend.DTO.PostDetailsDTO;
import com.educhat.backend.DTO.PostResponseDTO;
import com.educhat.backend.models.Post;
import com.educhat.backend.services.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin("*")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("subject/{subjectId}/user/{userId}")
    public ResponseEntity<List<PostResponseDTO>> getPosts(@PathVariable Long subjectId, @PathVariable Long userId) {
        List<PostResponseDTO> subjectPosts = postService.getPostsBySubject(subjectId, userId);
        return ResponseEntity.ok(subjectPosts);
    }

    @PostMapping(value = "/user/{userId}", consumes = "multipart/form-data")
    public ResponseEntity<Post> createPost(@PathVariable Long userId,
                                           @RequestPart("post") String postJson,
                                           @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        try {
            // Parse the JSON string into PostCreateDTO
            ObjectMapper objectMapper = new ObjectMapper();
            PostCreateDTO postCreateDTO = objectMapper.readValue(postJson, PostCreateDTO.class);

            // Call the service method
            Post response = postService.createPostAndImages(userId, postCreateDTO, images);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null); // Handle invalid JSON or errors
        }
    }

    @GetMapping("/{postId}/user/{userId}")
    public ResponseEntity<PostDetailsDTO> postDetails(@PathVariable Long postId, @PathVariable Long userId) {
        PostDetailsDTO response = postService.getPostDetails(postId, userId);
        return ResponseEntity.ok(response);
    }

}
