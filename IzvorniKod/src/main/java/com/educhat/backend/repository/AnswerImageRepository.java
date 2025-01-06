package com.educhat.backend.repository;

import com.educhat.backend.models.AnswerImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerImageRepository extends JpaRepository<AnswerImage, Long> {

    List<AnswerImage> findByAnswerId(Long answerId);

}
