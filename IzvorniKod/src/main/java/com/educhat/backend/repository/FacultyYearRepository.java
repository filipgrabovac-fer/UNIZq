package com.educhat.backend.repository;

import com.educhat.backend.models.FacultyYear;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultyYearRepository extends JpaRepository<FacultyYear, Long> {

    List<FacultyYear> findByFacultyId(Long facultyId);

}
