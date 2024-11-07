package com.educhat.backend.repository;

import com.educhat.backend.models.FacultyUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyUserRepository extends JpaRepository<FacultyUser, Long> {
}
