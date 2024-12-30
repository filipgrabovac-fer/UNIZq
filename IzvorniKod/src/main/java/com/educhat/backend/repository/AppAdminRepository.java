package com.educhat.backend.repository;

import com.educhat.backend.models.AppAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppAdminRepository extends JpaRepository<AppAdmin, Long> {
    boolean existsByUserId(Long userId);
}
