package com.educhat.backend.controllers;

import com.educhat.backend.models.PostInteractions;
import com.educhat.backend.services.PostInteractionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/post-interaction")
@CrossOrigin("*")
@RequiredArgsConstructor
public class PostInteractionController {

    private final PostInteractionsService postInteractionsService;

    @GetMapping
    public ResponseEntity<List<PostInteractions>> getAllPostInteractions() {
        List<PostInteractions> postInteractions = postInteractionsService.getAllPostInteractions();
        return ResponseEntity.ok(postInteractions);
    }

    @PutMapping("/{postId}/{action}/user/{userId}")
    public ResponseEntity<String> updateOrCreatePostInteraction(
            @PathVariable Long postId,
            @PathVariable String action,
            @PathVariable Long userId) {
        boolean result = postInteractionsService.updateOrCreatePostInteraction(postId, userId, action.toLowerCase());
        if (result) {
            return ResponseEntity.ok("Interaction updated/created successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid action or failed to perform action");
        }
    }
}
