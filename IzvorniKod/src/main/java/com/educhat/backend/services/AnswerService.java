package com.educhat.backend.services;

import com.educhat.backend.exceptions.FacultyUserNotFoundException;
import com.educhat.backend.exceptions.FacultyYearNotFoundException;
import com.educhat.backend.exceptions.PostNotFoundException;
import com.educhat.backend.exceptions.SubjectNotFoundException;
import com.educhat.backend.models.*;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private AnswerImageRepository answerImageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private FacultyUserRepository facultyUserRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private FacultyYearRepository facultyYearRepository;

    public Answer createAnswerWithImages(Long postId, Long userId, String description, List<MultipartFile> images) {
        // Step 1: Validate post and user
        if (!postRepository.existsById(postId)) {
            throw new IllegalArgumentException("Post not found");
        }
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("User not found");
        }

        // find faculty user who created answer
        Post post = postRepository.findById(postId)
                .orElseThrow( () -> new PostNotFoundException("Post not found"));
        FacultyUser postFacultyUser = facultyUserRepository.findById(post.getFacultyUserId())
                .orElseThrow( () -> new FacultyUserNotFoundException("FacultyUser not found"));
        Long facultyId = postFacultyUser.getFacultyId();
        FacultyUser answerFacultyUser = facultyUserRepository.findByUserIdAndFacultyId(userId, facultyId)
                .orElseThrow( () -> new FacultyUserNotFoundException("FacultyUser not found"));

        // Step 2: Create and save the Answer
        Answer answer = new Answer();
        answer.setPostId(postId);
        answer.setFacultyUserId(answerFacultyUser.getId());
        answer.setDescription(description);
        answer.setUpvotes(0);
        answer.setDownvotes(0);
        answer.setReports(0);
        answer.setLikedByAuthor(false);

        Answer savedAnswer = answerRepository.save(answer);

        // Step 3: Handle image uploads
        if (images != null && !images.isEmpty()) {
            List<AnswerImage> answerImagesForSave = new ArrayList<>();
            for (MultipartFile file : images) {
                try {
                    // Upload the file to Cloudinary
                    File tempFile = File.createTempFile("upload", file.getOriginalFilename());
                    file.transferTo(tempFile);

                    String imageUrl = cloudinaryService.uploadFile(tempFile); // Upload and get URL
                    tempFile.delete(); // Clean up temporary file

                    // Create and save AnswerImage
                    AnswerImage answerImage = new AnswerImage();
                    answerImage.setAnswerId(savedAnswer.getId()); // Associate image with answer
                    answerImage.setLink(imageUrl);
                    answerImagesForSave.add(answerImage);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to upload image: " + e.getMessage());
                }
            }

            answerImageRepository.saveAll(answerImagesForSave); // Save all images
        }

        return savedAnswer;
    }

    public boolean deleteAnswer(Long answerId, Long userId) {
        // Fetch the answer
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new IllegalArgumentException("Answer not found."));

        // Check if the user is the creator of the answer
        if (answer.getFacultyUserId().equals(userId)) {
            answerRepository.delete(answer);
            return true;
        }

        // Fetch the post associated with the answer
        Post post = postRepository.findById(answer.getPostId())
                .orElseThrow(() -> new PostNotFoundException("Post not found."));

        // Fetch the faculty user associated with the userId
        FacultyUser facultyUser = facultyUserRepository.findByUserId(userId)
                .stream()
                .filter(fu -> !fu.isKicked()) // Ensure the user is not kicked
                .findFirst()
                .orElseThrow(() -> new FacultyUserNotFoundException("Faculty user not found or inactive."));

        // Fetch the Subject and FacultyYear to determine the faculty of the post
        Subject subject = subjectRepository.findById(post.getSubjectId())
                .orElseThrow(() -> new SubjectNotFoundException("Subject not found."));

        FacultyYear facultyYear = facultyYearRepository.findById(subject.getFacultyYearId())
                .orElseThrow(() -> new FacultyYearNotFoundException("Faculty year not found."));

        // Check if the user has ADMIN role and belongs to the same faculty
        if (facultyUser.getRole() == Role.ADMIN && facultyUser.getFacultyId().equals(facultyYear.getFacultyId())) {
            answerRepository.delete(answer);
            return true;
        }

        // If neither condition is met, return false
        return false;
    }
}
