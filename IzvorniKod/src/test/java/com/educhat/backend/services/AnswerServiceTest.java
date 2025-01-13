package com.educhat.backend.services;

import com.educhat.backend.models.*;
import com.educhat.backend.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AnswerServiceTest {

    @Mock
    private AnswerRepository answerRepository;

    @Mock
    private AnswerImageRepository answerImageRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PostRepository postRepository;

    @Mock
    private CloudinaryService cloudinaryService;

    @Mock
    private FacultyUserRepository facultyUserRepository;

    @Mock
    private SubjectRepository subjectRepository;

    @Mock
    private FacultyYearRepository facultyYearRepository;

    @InjectMocks
    private AnswerService answerService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateAnswerWithImages() throws IOException {
        // Arrange
        Long postId = 1L;
        Long userId = 1L;
        String description = "Test Answer";
        MultipartFile file = mock(MultipartFile.class);
        List<MultipartFile> images = List.of(file);

        Post post = new Post();
        post.setId(postId);
        post.setFacultyUserId(userId);

        FacultyUser facultyUser = new FacultyUser();
        facultyUser.setId(userId);
        facultyUser.setFacultyId(1L);

        Answer mockAnswer = new Answer();
        mockAnswer.setId(1L); // Simulate ID assignment after saving

        when(postRepository.existsById(postId)).thenReturn(true);
        when(userRepository.existsById(userId)).thenReturn(true);
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(facultyUserRepository.findById(userId)).thenReturn(Optional.of(facultyUser));
        when(facultyUserRepository.findByUserIdAndFacultyId(userId, 1L)).thenReturn(Optional.of(facultyUser));
        when(cloudinaryService.uploadFile(any(File.class))).thenReturn("http://image.url");
        when(answerRepository.save(any(Answer.class))).thenReturn(mockAnswer); // Mock save behavior

        // Act
        Answer answer = answerService.createAnswerWithImages(postId, userId, description, images);

        // Assert
        assertNotNull(answer); // Ensure the returned answer is not null
        assertEquals(mockAnswer.getId(), answer.getId()); // Verify the saved answer ID
        verify(answerRepository, times(1)).save(any(Answer.class)); // Verify save was called
        verify(answerImageRepository, times(1)).saveAll(anyList()); // Verify images were saved
    }


    @Test
    public void testDeleteAnswer() {
        Long answerId = 1L;
        Long userId = 1L;

        Answer answer = new Answer();
        answer.setId(answerId);
        answer.setFacultyUserId(userId);

        when(answerRepository.findById(answerId)).thenReturn(Optional.of(answer));

        boolean result = answerService.deleteAnswer(answerId, userId);

        assertTrue(result);
        verify(answerRepository, times(1)).delete(answer);
    }

    @Test
    public void testCreateAnswerWithImages_PostNotFound() {
        // Arrange
        Long postId = 1L;
        Long userId = 1L;
        String description = "Test Answer";
        List<MultipartFile> images = List.of(mock(MultipartFile.class));

        when(postRepository.existsById(postId)).thenReturn(false);

        // Act & Assert
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            answerService.createAnswerWithImages(postId, userId, description, images);
        });

        assertEquals("Post not found", exception.getMessage());
        verify(postRepository, times(1)).existsById(postId);
        verify(userRepository, never()).existsById(anyLong());
    }

    @Test
    public void testCreateAnswerWithImages_UserNotFound() {
        // Arrange
        Long postId = 1L;
        Long userId = 1L;
        String description = "Test Answer";
        List<MultipartFile> images = List.of(mock(MultipartFile.class));

        when(postRepository.existsById(postId)).thenReturn(true);
        when(userRepository.existsById(userId)).thenReturn(false);

        // Act & Assert
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            answerService.createAnswerWithImages(postId, userId, description, images);
        });

        assertEquals("User not found", exception.getMessage());
        verify(postRepository, times(1)).existsById(postId);
        verify(userRepository, times(1)).existsById(userId);
    }
}