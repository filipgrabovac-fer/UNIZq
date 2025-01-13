package com.educhat.backend.controllers;

import com.educhat.backend.DTO.PostCreateDTO;
import com.educhat.backend.DTO.PostDetailsDTO;
import com.educhat.backend.DTO.PostResponseDTO;
import com.educhat.backend.exceptions.PostNotFoundException;
import com.educhat.backend.models.Post;
import com.educhat.backend.services.PostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PostControllerTest {

    @Mock
    private PostService postService;

    @InjectMocks
    private PostController postController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void testGetPosts_Success() {
        Long subjectId = 1L;
        Long userId = 1L;

        List<PostResponseDTO> postResponses = List.of(new PostResponseDTO());
        when(postService.getPostsBySubject(subjectId, userId)).thenReturn(postResponses);

        ResponseEntity<List<PostResponseDTO>> response = postController.getPosts(subjectId, userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(postResponses, response.getBody());
        verify(postService, times(1)).getPostsBySubject(subjectId, userId);
    }

    @Test
    void testCreatePost_Success() throws Exception {
        Long userId = 1L;
        String postJson = "{\"postHeader\":\"Test Post\",\"postContent\":\"Content\",\"facultyId\":1,\"subjectId\":1}";
        List<MultipartFile> images = List.of(mock(MultipartFile.class));

        Post post = new Post();
        post.setId(1L);
        post.setTitle("Test Post");

        when(postService.createPostAndImages(eq(userId), any(PostCreateDTO.class), eq(images))).thenReturn(post);

        ResponseEntity<Post> response = postController.createPost(userId, postJson, images);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(post, response.getBody());
        verify(postService, times(1)).createPostAndImages(eq(userId), any(PostCreateDTO.class), eq(images));
    }

    @Test
    void testCreatePost_InvalidJson() {
        Long userId = 1L;
        String invalidJson = "Invalid JSON";
        List<MultipartFile> images = List.of();

        ResponseEntity<Post> response = postController.createPost(userId, invalidJson, images);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNull(response.getBody());
        verify(postService, never()).createPostAndImages(anyLong(), any(PostCreateDTO.class), anyList());
    }

    @Test
    void testPostDetails_Success() {
        Long postId = 1L;
        Long userId = 1L;

        PostDetailsDTO postDetails = new PostDetailsDTO();
        when(postService.getPostDetails(postId, userId)).thenReturn(postDetails);

        ResponseEntity<PostDetailsDTO> response = postController.postDetails(postId, userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(postDetails, response.getBody());
        verify(postService, times(1)).getPostDetails(postId, userId);
    }

    @Test
    void testPostDetails_PostNotFound() {
        Long postId = 1L;
        Long userId = 1L;

        when(postService.getPostDetails(postId, userId)).thenThrow(new PostNotFoundException("Post not found"));

        Exception exception = assertThrows(PostNotFoundException.class, () -> {
            postController.postDetails(postId, userId);
        });

        assertEquals("Post not found", exception.getMessage());
        verify(postService, times(1)).getPostDetails(postId, userId);
    }

    @Test
    void testDeletePost_Success() {
        Long postId = 1L;
        Long userId = 1L;

        when(postService.deletePost(postId, userId)).thenReturn(true);

        ResponseEntity<String> response = postController.deletePost(postId, userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Post deleted successfully.", response.getBody());
        verify(postService, times(1)).deletePost(postId, userId);
    }

    @Test
    void testDeletePost_Unauthorized() {
        Long postId = 1L;
        Long userId = 1L;

        when(postService.deletePost(postId, userId)).thenReturn(false);

        ResponseEntity<String> response = postController.deletePost(postId, userId);

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        assertEquals("You are not authorized to delete this post.", response.getBody());
        verify(postService, times(1)).deletePost(postId, userId);
    }
}
