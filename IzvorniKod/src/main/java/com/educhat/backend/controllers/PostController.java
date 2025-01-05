package com.educhat.backend.controllers;

import com.educhat.backend.DTO.PostCreateDTO;
import com.educhat.backend.DTO.PostDetailsDTO;
import com.educhat.backend.DTO.PostResponseDTO;
import com.educhat.backend.models.Post;
import com.educhat.backend.services.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/user/{userId}")
    public ResponseEntity<Post> createPost(@PathVariable Long userId, @RequestBody PostCreateDTO postCreateDTO) {
        Post response = postService.createPostAndImages(userId, postCreateDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{postId}/user/{userId}")
    public ResponseEntity<PostDetailsDTO> postDetails(@PathVariable Long postId, @PathVariable Long userId) {
        PostDetailsDTO response = postService.getPostDetails(postId, userId);
        return ResponseEntity.ok(response);
    }

}
