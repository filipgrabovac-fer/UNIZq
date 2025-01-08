package com.educhat.backend.repository;

import com.educhat.backend.models.FacultyYear;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultyYearRepository extends JpaRepository<FacultyYear, Long> {

    List<FacultyYear> findByFacultyId(Long facultyId);

    @Modifying
    @Transactional
    @Query("DELETE FROM FacultyYear fy WHERE fy.facultyId = :facultyId")
    void deleteByFacultyId(@Param("facultyId") Long facultyId);

}
