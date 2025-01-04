package com.educhat.backend.repository;

import com.educhat.backend.models.AnswerImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerImageRepository extends JpaRepository<AnswerImage, Long> {

    List<AnswerImage> findByAnswerId(Long answerId);
}
