package com.educhat.backend.services;

import com.educhat.backend.models.*;
import com.educhat.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerInteractionsService {

    private final AnswerInteractionRepository answerInteractionRepository;
    private final AnswerRepository answerRepository;
    private final PostRepository postRepository;
    private final SubjectRepository subjectRepository;
    private final FacultyYearRepository facultyYearRepository;
    private final FacultyUserRepository facultyUserRepository;

    public List<AnswerInteractions> getAllAnswerInteractions() {
        return answerInteractionRepository.findAll();
    }

    public boolean updateOrCreateAnswerInteraction(Long answerId, Long userId, String action) {
        // Step 1: Get the Answer
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new IllegalArgumentException("Answer not found for id: " + answerId));

        // Step 2: Get the Post linked to the Answer
        Post post = postRepository.findById(answer.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("Post not found for id: " + answer.getPostId()));

        // Step 3: Get the Subject linked to the Post
        Subject subject = subjectRepository.findById(post.getSubjectId())
                .orElseThrow(() -> new IllegalArgumentException("Subject not found for id: " + post.getSubjectId()));

        // Step 4: Get the FacultyYear linked to the Subject
        FacultyYear facultyYear = facultyYearRepository.findById(subject.getFacultyYearId())
                .orElseThrow(() -> new IllegalArgumentException("FacultyYear not found for id: " + subject.getFacultyYearId()));

        // Step 5: Get the FacultyUser based on Faculty and User
        FacultyUser facultyUser = facultyUserRepository.findByFacultyIdAndUserId(facultyYear.getFacultyId(), userId)
                .orElseThrow(() -> new IllegalArgumentException("FacultyUser not found for facultyId: "
                        + facultyYear.getFacultyId() + " and userId: " + userId));

        Long facultyUserId = facultyUser.getId();

        // Step 6: Perform interaction logic
        AnswerInteractions answerInteraction = answerInteractionRepository
                .findByAnswerIdAndFacultyUserId(answerId, facultyUserId)
                .orElse(new AnswerInteractions(answerId, facultyUserId));

        switch (action) {
            case "upvote":
                if (!answerInteraction.isUpvoted()) {
                    answerInteraction.setUpvoted(true);
                    answerInteraction.setDownvoted(false); // Ensure downvote is removed
                    answer.setUpvotes(answer.getUpvotes() + 1); // Increment upvotes
                } else {
                    answerInteraction.setUpvoted(false);
                    answer.setUpvotes(answer.getUpvotes() - 1); // Decrement upvotes
                }
                break;

            case "downvote":
                if (!answerInteraction.isDownvoted()) {
                    answerInteraction.setDownvoted(true);
                    answerInteraction.setUpvoted(false); // Ensure upvote is removed
                    answer.setDownvotes(answer.getDownvotes() + 1); // Increment downvotes
                } else {
                    answerInteraction.setDownvoted(false);
                    answer.setDownvotes(answer.getDownvotes() - 1); // Decrement downvotes
                }
                break;

            case "report":
                if (!answerInteraction.isReported()) {
                    answerInteraction.setReported(true);
                    answer.setReports(answer.getReports() + 1); // Increment reports
                } else {
                    answerInteraction.setReported(false);
                    answer.setReports(answer.getReports() - 1); // Decrement reports
                }
                break;

            default:
                return false; // Invalid action
        }

        // Save the interaction
        answerInteractionRepository.save(answerInteraction);

        // Save the updated answer
        answerRepository.save(answer);

        return true;
    }
}
