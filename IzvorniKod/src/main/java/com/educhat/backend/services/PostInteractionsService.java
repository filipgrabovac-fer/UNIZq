package com.educhat.backend.services;

import com.educhat.backend.models.*;
import com.educhat.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostInteractionsService {

    private final PostInteractionRepository postInteractionRepository;
    private final PostRepository postRepository;
    private final SubjectRepository subjectRepository;
    private final FacultyYearRepository facultyYearRepository;
    private final FacultyUserRepository facultyUserRepository;

    public List<PostInteractions> getAllPostInteractions() {
        List<PostInteractions> allPosts = postInteractionRepository.findAll();
        return allPosts;
    }

    public boolean updateOrCreatePostInteraction(Long postId, Long userId, String action) {
        // Step 1: Get the Post
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found for id: " + postId));

        // Step 2: Get the Subject
        Subject subject = subjectRepository.findById(post.getSubjectId())
                .orElseThrow(() -> new IllegalArgumentException("Subject not found for id: " + post.getSubjectId()));

        // Step 3: Get the FacultyYear
        FacultyYear facultyYear = facultyYearRepository.findById(subject.getFacultyYearId())
                .orElseThrow(() -> new IllegalArgumentException("FacultyYear not found for id: " + subject.getFacultyYearId()));

        // Step 4: Get the FacultyUser
        FacultyUser facultyUser = facultyUserRepository.findByFacultyIdAndUserId(facultyYear.getFacultyId(), userId)
                .orElseThrow(() -> new IllegalArgumentException("FacultyUser not found for facultyId: "
                        + facultyYear.getFacultyId() + " and userId: " + userId));

        Long facultyUserId = facultyUser.getId();

        // Step 5: Perform interaction logic
        PostInteractions postInteraction = postInteractionRepository
                .findByPostIdAndFacultyUserId(postId, facultyUserId)
                .orElse(new PostInteractions(postId, facultyUserId));

        switch (action) {

            case "upvote":
                if (!postInteraction.isUpvoted()) {
                    postInteraction.setUpvoted(true);
                    postInteraction.setDownvoted(false); // Ensure downvote is removed
                    post.setUpvotes(post.getUpvotes() + 1); // Increment upvotes
                } else {
                    postInteraction.setUpvoted(false);
                    post.setUpvotes(post.getUpvotes() - 1); // Decrement upvotes
                }
                break;

            case "downvote":
                if (!postInteraction.isDownvoted()) {
                    postInteraction.setDownvoted(true);
                    postInteraction.setUpvoted(false); // Ensure upvote is removed
                    post.setDownvotes(post.getDownvotes() + 1); // Increment downvotes
                } else {
                    postInteraction.setDownvoted(false);
                    post.setDownvotes(post.getDownvotes() - 1); // Decrement downvotes
                }
                break;

            case "report":
                if (!postInteraction.isReported()) {
                    postInteraction.setReported(true);
                    post.setReports(post.getReports() + 1); // Increment reports
                } else {
                    postInteraction.setReported(false);
                    post.setReports(post.getReports() - 1); // Decrement reports
                }
                break;

            default:
                return false; // Invalid action
        }

        // Save the interaction
        postInteractionRepository.save(postInteraction);

        // Save the updated post
        postRepository.save(post);

        return true;
    }
}
