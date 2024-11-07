package com.educhat.backend.repository;

import com.educhat.backend.models.AppAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppAdminRepository extends JpaRepository<AppAdmin, Long> {
}
