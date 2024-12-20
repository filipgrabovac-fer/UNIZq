package com.educhat.backend.repository;

import com.educhat.backend.models.FacultyUser;
import com.educhat.backend.models.enums.Role;
import jakarta.validation.constraints.NotNull;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FacultyUserRepository extends JpaRepository<FacultyUser, Long> {

    boolean existsByUserIdAndFacultyIdAndRole(Long userId, @NonNull Long facultyId, Role role);

    Optional<FacultyUser> findByUserIdAndFacultyIdAndRole(Long userId, Long facultyId, Role role);

    Optional<FacultyUser> findByUserIdAndFacultyId(Long userId, Long facultyId);
}
