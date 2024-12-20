package com.educhat.backend.repository;

import com.educhat.backend.models.FacultyYear;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyYearRepository extends JpaRepository<FacultyYear, Long> {
}
