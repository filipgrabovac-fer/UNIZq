package com.educhat.backend.controllers;

import com.educhat.backend.models.Answer;
import com.educhat.backend.services.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
@CrossOrigin("*")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @PostMapping(value = "/post/{postId}/user/{userId}", consumes = "multipart/form-data")
    public ResponseEntity<Answer> createAnswer(@PathVariable Long postId,
                                               @PathVariable Long userId,
                                               @RequestPart("description") String description,
                                               @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        Answer answer = answerService.createAnswerWithImages(postId, userId, description, images);
        return ResponseEntity.ok(answer);
    }

    @DeleteMapping("/{answerId}/user/{userId}")
    public ResponseEntity<String> deleteAnswer(@PathVariable Long answerId, @PathVariable Long userId) {
        boolean isDeleted = answerService.deleteAnswer(answerId, userId);
        if (isDeleted) {
            return ResponseEntity.ok("Answer deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to delete this answer.");
        }
    }
}
