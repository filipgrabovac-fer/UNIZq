package com.educhat.backend.controllers;

import com.educhat.backend.models.Answer;
import com.educhat.backend.services.AnswerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class AnswerControllerTest {

    @Mock
    private AnswerService answerService;

    @InjectMocks
    private AnswerController answerController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // 1. Test for createAnswer success
    @Test
    void testCreateAnswer_Success() {
        Long postId = 1L;
        Long userId = 1L;
        String description = "This is a test answer";
        List<MultipartFile> images = List.of(mock(MultipartFile.class));

        Answer answer = new Answer();
        answer.setId(1L);
        answer.setDescription(description);

        when(answerService.createAnswerWithImages(eq(postId), eq(userId), eq(description), eq(images)))
                .thenReturn(answer);

        ResponseEntity<Answer> response = answerController.createAnswer(postId, userId, description, images);

        assertEquals(ResponseEntity.ok(answer), response);
        verify(answerService, times(1)).createAnswerWithImages(eq(postId), eq(userId), eq(description), eq(images));
    }

    @Test
    void testCreateAnswer_PostNotFound() {
        Long postId = 1L;
        Long userId = 1L;
        String description = "This is a test answer";
        List<MultipartFile> images = List.of(mock(MultipartFile.class));

        when(answerService.createAnswerWithImages(eq(postId), eq(userId), eq(description), eq(images)))
                .thenThrow(new IllegalArgumentException("Post not found"));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                answerController.createAnswer(postId, userId, description, images));

        assertEquals("Post not found", exception.getMessage());
        verify(answerService, times(1)).createAnswerWithImages(eq(postId), eq(userId), eq(description), eq(images));
    }

    @Test
    void testCreateAnswer_UserNotFound() {
        Long postId = 1L;
        Long userId = 1L;
        String description = "This is a test answer";
        List<MultipartFile> images = List.of(mock(MultipartFile.class));

        when(answerService.createAnswerWithImages(eq(postId), eq(userId), eq(description), eq(images)))
                .thenThrow(new IllegalArgumentException("User not found"));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                answerController.createAnswer(postId, userId, description, images));

        assertEquals("User not found", exception.getMessage());
        verify(answerService, times(1)).createAnswerWithImages(eq(postId), eq(userId), eq(description), eq(images));
    }

    @Test
    void testDeleteAnswer_Success() {
        Long answerId = 1L;
        Long userId = 1L;

        when(answerService.deleteAnswer(answerId, userId)).thenReturn(true);

        ResponseEntity<Boolean> response = answerController.deleteAnswer(answerId, userId);

        assertEquals(ResponseEntity.ok(true), response);
        verify(answerService, times(1)).deleteAnswer(answerId, userId);
    }

    @Test
    void testDeleteAnswer_Unauthorized() {
        Long answerId = 1L;
        Long userId = 1L;

        when(answerService.deleteAnswer(answerId, userId)).thenReturn(false);

        ResponseEntity<Boolean> response = answerController.deleteAnswer(answerId, userId);

        assertEquals(403, response.getStatusCodeValue());
        assertTrue(response.getBody());
        verify(answerService, times(1)).deleteAnswer(answerId, userId);
    }

    @Test
    void testDeleteAnswer_AnswerNotFound() {
        Long answerId = 1L;
        Long userId = 1L;

        when(answerService.deleteAnswer(answerId, userId))
                .thenThrow(new IllegalArgumentException("Answer not found"));

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                answerController.deleteAnswer(answerId, userId));

        assertEquals("Answer not found", exception.getMessage());
        verify(answerService, times(1)).deleteAnswer(answerId, userId);
    }

}