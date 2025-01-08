package com.educhat.backend.repository;

import com.educhat.backend.models.Post;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findBySubjectId(Long subjectId);

    List<Post> findByFacultyUserId(Long facultyUserId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Post p WHERE p.subjectId = :subjectId")
    void deleteBySubjectId(@Param("subjectId") Long subjectId);


}
