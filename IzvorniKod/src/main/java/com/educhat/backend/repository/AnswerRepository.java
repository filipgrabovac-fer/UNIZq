package com.educhat.backend.repository;

import com.educhat.backend.models.Answer;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    List<Answer> findByPostId(Long postId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Answer a WHERE a.postId = :postId")
    void deleteByPostId(@Param("postId") Long postId);

}
