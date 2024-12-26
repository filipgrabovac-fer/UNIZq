package com.educhat.backend.repository;

import com.educhat.backend.models.FacultyUser;
import com.educhat.backend.models.enums.Role;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultyUserRepository extends JpaRepository<FacultyUser, Long> {

    boolean existsByUserIdAndFacultyIdAndRole(Long userId, Long facultyId, Role role);

    List<FacultyUser> findByUserIdAndRole(Long userId, Role role);

}
