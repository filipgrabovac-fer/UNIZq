package com.educhat.backend.services;

import com.educhat.backend.models.Answer;
import com.educhat.backend.models.AnswerImage;
import com.educhat.backend.repository.AnswerImageRepository;
import com.educhat.backend.repository.AnswerRepository;
import com.educhat.backend.repository.PostRepository;
import com.educhat.backend.repository.UserRepository;
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

    public Answer createAnswerWithImages(Long postId, Long userId, String description, List<MultipartFile> images) {
        // Step 1: Validate post and user
        if (!postRepository.existsById(postId)) {
            throw new IllegalArgumentException("Post not found");
        }
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("User not found");
        }

        // Step 2: Create and save the Answer
        Answer answer = new Answer();
        answer.setPostId(postId);
        answer.setUserId(userId);
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
                    answerImage.setAppAdminId(savedAnswer.getId()); // Associate image with answer
                    answerImage.setTitle(imageUrl);
                    answerImagesForSave.add(answerImage);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to upload image: " + e.getMessage());
                }
            }

            answerImageRepository.saveAll(answerImagesForSave); // Save all images
        }

        return savedAnswer;
    }
}