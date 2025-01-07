package com.educhat.backend.repository;

import com.educhat.backend.models.AnswerInteractions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnswerInteractionRepository extends JpaRepository<AnswerInteractions, Long> {
    Optional<AnswerInteractions> findByAnswerIdAndFacultyUserId(Long answerId, Long facultyUserId);
}