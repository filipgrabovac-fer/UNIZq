package com.educhat.backend.repository;

import com.educhat.backend.models.PostInteractions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostInteractionRepository extends JpaRepository<PostInteractions, Long> {
    Optional<PostInteractions> findByPostId(Long postId);
    Optional<PostInteractions> findByPostIdAndFacultyUserId(Long postId, Long facultyUserId);
}
