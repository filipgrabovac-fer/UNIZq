package com.educhat.backend.repository;

import com.educhat.backend.models.AnswerImage;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerImageRepository extends JpaRepository<AnswerImage, Long> {

    List<AnswerImage> findByAnswerId(Long answerId);

    @Modifying
    @Transactional
    @Query("DELETE FROM AnswerImage ai WHERE ai.answerId = :answerId")
    void deleteByAnswerId(@Param("answerId") Long answerId);


}
