package com.educhat.backend.repository;

import com.educhat.backend.models.FacultyAdminApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyAdminApplicationRepository extends JpaRepository<FacultyAdminApplication, Long> {
}
