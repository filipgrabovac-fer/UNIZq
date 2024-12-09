package com.educhat.backend.repository;

import com.educhat.backend.models.FacultyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyUserRepository extends JpaRepository<FacultyUser, Long> {
}
