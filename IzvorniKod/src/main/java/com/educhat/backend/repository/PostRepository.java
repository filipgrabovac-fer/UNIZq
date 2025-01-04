package com.educhat.backend.repository;

import com.educhat.backend.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findBySubjectId(Long subjectId);

    List<Post> findByFacultyUserId(Long facultyUserId);

}
