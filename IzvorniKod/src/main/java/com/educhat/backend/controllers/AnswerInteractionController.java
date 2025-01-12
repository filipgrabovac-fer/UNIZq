package com.educhat.backend.controllers;

import com.educhat.backend.models.AnswerInteractions;
import com.educhat.backend.services.AnswerInteractionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/answer-interaction")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AnswerInteractionController {

    private final AnswerInteractionsService answerInteractionsService;

    // Retrieve all answer interactions
    @GetMapping
    public ResponseEntity<List<AnswerInteractions>> getAllAnswerInteractions() {
        List<AnswerInteractions> answerInteractions = answerInteractionsService.getAllAnswerInteractions();
        return ResponseEntity.ok(answerInteractions);
    }

    // Update or create an answer interaction
    @PutMapping("/{answerId}/{action}/user/{userId}")
    public ResponseEntity<String> updateOrCreateAnswerInteraction(
            @PathVariable Long answerId,
            @PathVariable String action,
            @PathVariable Long userId) {
        boolean result = answerInteractionsService.updateOrCreateAnswerInteraction(answerId, userId, action.toLowerCase());
        if (result) {
            return ResponseEntity.ok("Interaction updated/created successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid action or failed to perform action");
        }
    }
}
