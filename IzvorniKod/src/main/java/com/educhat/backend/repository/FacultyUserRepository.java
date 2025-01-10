package com.educhat.backend.repository;

import com.educhat.backend.models.FacultyUser;
import com.educhat.backend.models.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface FacultyUserRepository extends JpaRepository<FacultyUser, Long> {

    List<FacultyUser> findByUserIdAndRole(Long userId, Role role);

    Optional<FacultyUser> findByUserIdAndFacultyIdAndRole(Long userId, Long facultyId, Role role);

    Optional<FacultyUser> findByUserIdAndFacultyId(Long userId, Long facultyId);

    List<FacultyUser> findByUserId(Long userId);

    Optional<FacultyUser> findByFacultyIdAndUserId(Long facultyId, Long userId);

    void deleteByFacultyId(Long facultyId);

    List<FacultyUser> findByFacultyIdAndRoleNot(Long facultyId, Role role);


}
