package com.educhat.backend.services;

import com.educhat.backend.exceptions.FacultyYearNotFoundException;
import com.educhat.backend.models.*;
import com.educhat.backend.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FacultyYearService {

    private final FacultyYearRepository facultyYearRepository;
    private final SubjectRepository subjectRepository;
    private final PostRepository postRepository;
    private final PostImageRepository postImageRepository;
    private final AnswerRepository answerRepository;
    private final AnswerImageRepository answerImageRepository;

    @Transactional
    public void deleteFacultyYearById(Long yearId) {
        // find if faculty year exists before deleting it
        if(!facultyYearRepository.existsById(yearId)) {
            throw new FacultyYearNotFoundException("Faculty year not found");
        }

        for(Subject subject : subjectRepository.findByFacultyYearId(yearId)) {

            for(Post post : postRepository.findBySubjectId(subject.getId())) {
                // delete all post images
                postImageRepository.deleteByPostId(post.getId());

                for(Answer answer : answerRepository.findByPostId(post.getId())) {
                    // delete all answer images
                    answerImageRepository.deleteByAnswerId(answer.getId());
                }
                // delete all answers
                answerRepository.deleteByPostId(post.getId());
            }
            // delete all posts
            postRepository.deleteBySubjectId(subject.getId());
        }
        // delete all subjects
        subjectRepository.deleteByFacultyYearId(yearId);

        // delete faculty year
        facultyYearRepository.deleteById(yearId);
    }

}
