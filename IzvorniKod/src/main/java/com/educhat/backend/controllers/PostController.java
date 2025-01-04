package com.educhat.backend.controllers;

import com.educhat.backend.DTO.PostCreateDTO;
import com.educhat.backend.DTO.PostDetailsAndAnswersDTO;
import com.educhat.backend.DTO.PostResponseDTO;
import com.educhat.backend.models.Answer;
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

    @GetMapping("subject/{subjectId}")
    public ResponseEntity<List<PostResponseDTO>> getPosts(@PathVariable Long subjectId, @RequestParam Long userId) {
        List<PostResponseDTO> subjectPosts = postService.getPostsBySubject(subjectId, userId);
        return ResponseEntity.ok(subjectPosts);
    }

    @GetMapping("{postId}")
    public ResponseEntity<PostDetailsAndAnswersDTO> postResponses(@PathVariable Long postId) {
        PostDetailsAndAnswersDTO response = postService.getPostResponses(postId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Post> createPost(@PathVariable Long userId, @RequestBody PostCreateDTO postCreateDTO) {
        Post response = postService.createPostAndImages(userId, postCreateDTO);
        return ResponseEntity.ok(response);
    }

}
