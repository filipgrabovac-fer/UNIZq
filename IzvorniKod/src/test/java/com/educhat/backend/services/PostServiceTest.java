package com.educhat.backend.services;

import com.educhat.backend.DTO.PostCreateDTO;
import com.educhat.backend.DTO.PostResponseDTO;
import com.educhat.backend.exceptions.FacultyUserNotFoundException;
import com.educhat.backend.exceptions.PostNotFoundException;
import com.educhat.backend.exceptions.SubjectNotFoundException;
import com.educhat.backend.exceptions.UserNotFoundException;
import com.educhat.backend.models.*;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PostServiceTest {

    @Mock
    private PostRepository postRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private SubjectRepository subjectRepository;
    @Mock
    private FacultyUserRepository facultyUserRepository;
    @Mock
    private PostInteractionRepository postInteractionsRepository;
    @Mock
    private FacultyYearRepository facultyYearRepository;
    @Mock
    private CloudinaryService cloudinaryService;
    @Mock
    private PostImageRepository postImageRepository;

    @InjectMocks
    private PostService postService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getPostsBySubject_Success() {
        // Arrange
        Long subjectId = 1L;
        Long userId = 1L;
        Long facultyUserId = 2L;
        Long facultyYearId = 10L;
        Long facultyId = 100L;

        User user = new User();
        user.setId(userId);
        user.setRole(Role.USER);

        FacultyUser facultyUser = new FacultyUser();
        facultyUser.setId(facultyUserId);
        facultyUser.setUserId(userId);

        Subject subject = new Subject();
        subject.setId(subjectId);
        subject.setFacultyYearId(facultyYearId);

        FacultyYear facultyYear = new FacultyYear();
        facultyYear.setId(facultyYearId);
        facultyYear.setFacultyId(facultyId);

        Post post = new Post();
        post.setId(1L);
        post.setTitle("Test Post");
        post.setFacultyUserId(facultyUserId);
        post.setSubjectId(subjectId);
        post.setDescription("Test Description");
        post.setActive(true);

        PostInteractions interactions = new PostInteractions(post.getId(), facultyUserId);
        interactions.setUpvoted(true);

        when(userRepository.existsById(userId)).thenReturn(true);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(subjectRepository.existsById(subjectId)).thenReturn(true);
        when(subjectRepository.findById(subjectId)).thenReturn(Optional.of(subject));
        when(facultyYearRepository.findById(facultyYearId)).thenReturn(Optional.of(facultyYear));
        when(facultyUserRepository.findByUserId(userId)).thenReturn(List.of(facultyUser));
        when(facultyUserRepository.findById(facultyUserId)).thenReturn(Optional.of(facultyUser)); // Mocked here
        when(postRepository.findBySubjectId(subjectId)).thenReturn(List.of(post));
        when(postInteractionsRepository.findByPostIdAndFacultyUserId(post.getId(), facultyUserId)).thenReturn(Optional.of(interactions));

        // Act
        List<PostResponseDTO> result = postService.getPostsBySubject(subjectId, userId);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        PostResponseDTO responseDTO = result.get(0);
        assertEquals(post.getId(), responseDTO.getId());
        assertTrue(responseDTO.isUserUpvoted());
        verify(postRepository).findBySubjectId(subjectId);
        verify(postInteractionsRepository).findByPostIdAndFacultyUserId(post.getId(), facultyUserId);
        verify(subjectRepository).findById(subjectId); // Ensure subject is fetched
        verify(facultyYearRepository).findById(facultyYearId); // Ensure facultyYear is fetched
        verify(facultyUserRepository).findById(facultyUserId); // Verify the repository is called
    }

    @Test
    void getPostsBySubject_UserNotFoundException() {
        // Arrange
        Long subjectId = 1L;
        Long userId = 1L;

        when(userRepository.existsById(userId)).thenReturn(false);

        // Act & Assert
        assertThrows(UserNotFoundException.class, () -> postService.getPostsBySubject(subjectId, userId));

        // Verify that no further repository calls are made
        verify(userRepository).existsById(userId);
        verifyNoInteractions(subjectRepository, postRepository, postInteractionsRepository);
    }

    @Test
    void getPostsBySubject_SubjectNotFoundException() {
        // Arrange
        Long subjectId = 1L;
        Long userId = 1L;

        when(userRepository.existsById(userId)).thenReturn(true);
        when(subjectRepository.existsById(subjectId)).thenReturn(false);

        // Act & Assert
        assertThrows(SubjectNotFoundException.class, () -> postService.getPostsBySubject(subjectId, userId));

        // Verify that no posts are fetched if subject does not exist
        verify(subjectRepository).existsById(subjectId);
        verifyNoInteractions(postRepository, postInteractionsRepository);
    }

    @Test
    void getPostsBySubject_FacultyUserNotFoundException() {
        // Arrange
        Long subjectId = 1L;
        Long userId = 1L;

        when(userRepository.existsById(userId)).thenReturn(true);
        when(subjectRepository.existsById(subjectId)).thenReturn(true);
        when(facultyUserRepository.findByUserId(userId)).thenReturn(new ArrayList<>()); // Empty list

        // Act & Assert
        assertThrows(FacultyUserNotFoundException.class, () -> postService.getPostsBySubject(subjectId, userId));
    }


    @Test
    void getPostsBySubject_FacultyUserNotFoundExceptionInIsUserAuthor() {
        // Arrange
        Long subjectId = 1L;
        Long userId = 1L;
        Long facultyUserId = 2L;

        User user = new User();
        user.setId(userId);
        user.setRole(Role.USER);

        FacultyUser facultyUser = new FacultyUser();
        facultyUser.setId(facultyUserId);
        facultyUser.setUserId(userId);

        Subject subject = new Subject();
        subject.setId(subjectId);
        subject.setFacultyYearId(10L);

        FacultyYear facultyYear = new FacultyYear();
        facultyYear.setId(10L);
        facultyYear.setFacultyId(20L);

        Post post = new Post();
        post.setId(1L);
        post.setTitle("Test Post");
        post.setFacultyUserId(facultyUserId);
        post.setSubjectId(subjectId);

        when(userRepository.existsById(userId)).thenReturn(true);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user)); // Mock user lookup
        when(subjectRepository.existsById(subjectId)).thenReturn(true);
        when(subjectRepository.findById(subjectId)).thenReturn(Optional.of(subject)); // Mock subject lookup
        when(facultyYearRepository.findById(subject.getFacultyYearId())).thenReturn(Optional.of(facultyYear)); // Mock facultyYear lookup
        when(facultyUserRepository.findByUserId(userId)).thenReturn(List.of(facultyUser)); // Valid FacultyUser for isUserAdmin
        when(postRepository.findBySubjectId(subjectId)).thenReturn(List.of(post));
        when(facultyUserRepository.findById(facultyUserId)).thenReturn(Optional.empty()); // FacultyUser not found

        // Act & Assert
        assertThrows(FacultyUserNotFoundException.class, () -> postService.getPostsBySubject(subjectId, userId));

        // Verify interactions
        verify(postRepository).findBySubjectId(subjectId);
        verify(facultyUserRepository).findById(facultyUserId); // Ensure the correct method is called
    }



    @Test
    void getPostsBySubject_SubjectNotFoundExceptionInIsUserAdmin() {
        // Arrange
        Long subjectId = 1L;
        Long userId = 1L;
        Long facultyUserId = 2L;

        User user = new User();
        user.setId(userId);
        user.setRole(Role.USER);

        FacultyUser facultyUser = new FacultyUser();
        facultyUser.setId(facultyUserId);
        facultyUser.setUserId(userId);

        Post post = new Post();
        post.setId(1L);
        post.setTitle("Test Post");
        post.setFacultyUserId(facultyUserId);
        post.setSubjectId(subjectId);

        when(userRepository.existsById(userId)).thenReturn(true);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(subjectRepository.existsById(subjectId)).thenReturn(true);
        when(subjectRepository.findById(subjectId)).thenReturn(Optional.empty()); // Subject not found
        when(facultyUserRepository.findByUserId(userId)).thenReturn(List.of(facultyUser)); // Valid FacultyUser
        when(postRepository.findBySubjectId(subjectId)).thenReturn(List.of(post));

        // Act & Assert
        assertThrows(SubjectNotFoundException.class, () -> postService.getPostsBySubject(subjectId, userId));

        // Verify interactions
        verify(subjectRepository).findById(subjectId);
        verify(facultyUserRepository).findByUserId(userId);
    }

    @Test
    void createPostAndImages_Success() throws IOException {
        // Arrange
        Long userId = 1L;
        Long facultyId = 1L;
        Long subjectId = 1L;
        PostCreateDTO postCreateDTO = new PostCreateDTO();
        postCreateDTO.setPostHeader("Test Header");
        postCreateDTO.setPostContent("Test Content");
        postCreateDTO.setFacultyId(facultyId);
        postCreateDTO.setSubjectId(subjectId);

        User user = new User();
        user.setId(userId);

        FacultyUser facultyUser = new FacultyUser();
        facultyUser.setId(1L);
        facultyUser.setUserId(userId);
        facultyUser.setFacultyId(facultyId);

        Post post = new Post();
        post.setId(1L);
        post.setTitle(postCreateDTO.getPostHeader());
        post.setDescription(postCreateDTO.getPostContent());
        post.setFacultyUserId(facultyUser.getId());
        post.setSubjectId(postCreateDTO.getSubjectId());
        post.setUpvotes(0);
        post.setDownvotes(0);
        post.setReports(0);
        post.setActive(true);

        MultipartFile mockFile = mock(MultipartFile.class);
        List<MultipartFile> imageFiles = List.of(mockFile);

        when(userRepository.existsById(userId)).thenReturn(true);
        when(facultyUserRepository.findByUserIdAndFacultyId(userId, facultyId)).thenReturn(Optional.of(facultyUser));
        when(postRepository.save(any(Post.class))).thenReturn(post);
        when(mockFile.getOriginalFilename()).thenReturn("test.jpg");
        when(cloudinaryService.uploadFile(any(File.class))).thenReturn("http://cloudinary.com/test.jpg");

        // Act
        Post result = postService.createPostAndImages(userId, postCreateDTO, imageFiles);

        // Assert
        assertNotNull(result);
        assertEquals(post.getId(), result.getId());
        assertEquals(post.getTitle(), result.getTitle());
        assertEquals(post.getDescription(), result.getDescription());
        assertEquals(post.getFacultyUserId(), result.getFacultyUserId());
        assertEquals(post.getSubjectId(), result.getSubjectId());
        assertTrue(result.isActive());

        verify(userRepository).existsById(userId);
        verify(facultyUserRepository).findByUserIdAndFacultyId(userId, facultyId);
        verify(postRepository).save(any(Post.class));
        verify(cloudinaryService).uploadFile(any(File.class));
        verify(postImageRepository).saveAll(anyList());
    }

    @Test
    void createPostAndImages_UserNotFoundException() {
        // Arrange
        Long userId = 1L;
        Long facultyId = 1L;
        Long subjectId = 1L;
        PostCreateDTO postCreateDTO = new PostCreateDTO();
        postCreateDTO.setPostHeader("Test Header");
        postCreateDTO.setPostContent("Test Content");
        postCreateDTO.setFacultyId(facultyId);
        postCreateDTO.setSubjectId(subjectId);
        List<MultipartFile> imageFiles = new ArrayList<>();

        when(userRepository.existsById(userId)).thenReturn(false);

        // Act & Assert
        assertThrows(UserNotFoundException.class, () -> postService.createPostAndImages(userId, postCreateDTO, imageFiles));

        // Verify that no further repository calls are made
        verify(userRepository).existsById(userId);
        verifyNoInteractions(facultyUserRepository, postRepository, cloudinaryService, postImageRepository);
    }

    @Test
    void createPostAndImages_FacultyUserNotFoundException() {
        // Arrange
        Long userId = 1L;
        Long facultyId = 1L;
        Long subjectId = 1L;
        PostCreateDTO postCreateDTO = new PostCreateDTO();
        postCreateDTO.setPostHeader("Test Header");
        postCreateDTO.setPostContent("Test Content");
        postCreateDTO.setFacultyId(facultyId);
        postCreateDTO.setSubjectId(subjectId);
        List<MultipartFile> imageFiles = new ArrayList<>();

        when(userRepository.existsById(userId)).thenReturn(true);
        when(facultyUserRepository.findByUserIdAndFacultyId(userId, facultyId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(FacultyUserNotFoundException.class, () -> postService.createPostAndImages(userId, postCreateDTO, imageFiles));

        // Verify that no further repository calls are made
        verify(userRepository).existsById(userId);
        verify(facultyUserRepository).findByUserIdAndFacultyId(userId, facultyId);
        verifyNoInteractions(postRepository, cloudinaryService, postImageRepository);
    }

    @Test
    void createPostAndImages_IOException() throws IOException {
        // Arrange
        Long userId = 1L;
        Long facultyId = 1L;
        Long subjectId = 1L;
        PostCreateDTO postCreateDTO = new PostCreateDTO();
        postCreateDTO.setPostHeader("Test Header");
        postCreateDTO.setPostContent("Test Content");
        postCreateDTO.setFacultyId(facultyId);
        postCreateDTO.setSubjectId(subjectId);

        User user = new User();
        user.setId(userId);

        FacultyUser facultyUser = new FacultyUser();
        facultyUser.setId(1L);
        facultyUser.setUserId(userId);
        facultyUser.setFacultyId(facultyId);

        Post post = new Post();
        post.setId(1L);
        post.setTitle(postCreateDTO.getPostHeader());
        post.setDescription(postCreateDTO.getPostContent());
        post.setFacultyUserId(facultyUser.getId());
        post.setSubjectId(postCreateDTO.getSubjectId());
        post.setUpvotes(0);
        post.setDownvotes(0);
        post.setReports(0);
        post.setActive(true);

        MultipartFile mockFile = mock(MultipartFile.class);
        List<MultipartFile> imageFiles = List.of(mockFile);

        when(userRepository.existsById(userId)).thenReturn(true);
        when(facultyUserRepository.findByUserIdAndFacultyId(userId, facultyId)).thenReturn(Optional.of(facultyUser));
        when(postRepository.save(any(Post.class))).thenReturn(post);
        when(mockFile.getOriginalFilename()).thenReturn("test.jpg");
        doThrow(new IOException("Test IOException")).when(mockFile).transferTo(any(File.class));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> postService.createPostAndImages(userId, postCreateDTO, imageFiles));

        // Verify interactions
        verify(userRepository).existsById(userId);
        verify(facultyUserRepository).findByUserIdAndFacultyId(userId, facultyId);
        verify(postRepository).save(any(Post.class));
        verify(mockFile).transferTo(any(File.class));
        verifyNoInteractions(cloudinaryService, postImageRepository);
    }

    @Test
    void deletePost_ShouldDeletePost_WhenUserIsCreator() {
        Long postId = 1L;
        Long userId = 1L;

        Post post = new Post();
        post.setId(postId);
        post.setFacultyUserId(userId);

        when(postRepository.findById(postId)).thenReturn(Optional.of(post));

        boolean result = postService.deletePost(postId, userId);

        assertTrue(result);
        verify(postRepository).delete(post);
    }

    @Test
    void deletePost_ShouldDeletePost_WhenUserIsAdmin() {
        Long postId = 1L;
        Long userId = 1L;
        Long facultyUserId = 2L;
        Long subjectId = 1L;
        Long facultyYearId = 1L;
        Long facultyId = 1L;

        Post post = new Post();
        post.setId(postId);
        post.setFacultyUserId(facultyUserId);
        post.setSubjectId(subjectId);

        FacultyUser facultyUser = new FacultyUser();
        facultyUser.setId(facultyUserId);
        facultyUser.setUserId(userId);
        facultyUser.setRole(Role.ADMIN);
        facultyUser.setFacultyId(facultyId);

        Subject subject = new Subject();
        subject.setId(subjectId);
        subject.setFacultyYearId(facultyYearId);

        FacultyYear facultyYear = new FacultyYear();
        facultyYear.setId(facultyYearId);
        facultyYear.setFacultyId(facultyId);

        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(facultyUserRepository.findByUserId(userId)).thenReturn(List.of(facultyUser));
        when(subjectRepository.findById(subjectId)).thenReturn(Optional.of(subject));
        when(facultyYearRepository.findById(facultyYearId)).thenReturn(Optional.of(facultyYear));

        boolean result = postService.deletePost(postId, userId);

        assertTrue(result);
        verify(postRepository).delete(post);
    }

    @Test
    void deletePost_ShouldThrowException_WhenPostNotFound() {
        Long postId = 1L;
        Long userId = 1L;

        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        assertThrows(PostNotFoundException.class, () -> postService.deletePost(postId, userId));
    }

    @Test
    void deletePost_ShouldThrowException_WhenFacultyUserNotFound() {
        Long postId = 1L;
        Long userId = 1L;
        Long facultyUserId = 2L;
        Long subjectId = 1L;

        Post post = new Post();
        post.setId(postId);
        post.setFacultyUserId(facultyUserId);
        post.setSubjectId(subjectId);

        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(facultyUserRepository.findByUserId(userId)).thenReturn(List.of());

        assertThrows(FacultyUserNotFoundException.class, () -> postService.deletePost(postId, userId));
    }

    @Test
    void deletePost_ShouldReturnFalse_WhenUserIsNotCreatorOrAdmin() {
        Long postId = 1L;
        Long userId = 1L;
        Long facultyUserId = 2L;
        Long subjectId = 1L;
        Long facultyYearId = 1L;
        Long facultyId = 1L;

        Post post = new Post();
        post.setId(postId);
        post.setFacultyUserId(facultyUserId);
        post.setSubjectId(subjectId);

        FacultyUser facultyUser = new FacultyUser();
        facultyUser.setId(facultyUserId);
        facultyUser.setUserId(userId);
        facultyUser.setRole(Role.USER);
        facultyUser.setFacultyId(facultyId);

        Subject subject = new Subject();
        subject.setId(subjectId);
        subject.setFacultyYearId(facultyYearId);

        FacultyYear facultyYear = new FacultyYear();
        facultyYear.setId(facultyYearId);
        facultyYear.setFacultyId(facultyId);

        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        when(facultyUserRepository.findByUserId(userId)).thenReturn(List.of(facultyUser));
        when(subjectRepository.findById(subjectId)).thenReturn(Optional.of(subject));
        when(facultyYearRepository.findById(facultyYearId)).thenReturn(Optional.of(facultyYear));

        boolean result = postService.deletePost(postId, userId);

        assertFalse(result);
        verify(postRepository, never()).delete(post);
    }
}
// Compare this snippet from src/main/java/com/educhat/backend/services/PostService.java: