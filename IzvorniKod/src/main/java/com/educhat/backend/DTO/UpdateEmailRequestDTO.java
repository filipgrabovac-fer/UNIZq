package com.educhat.backend.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateEmailRequestDTO {
    @NotNull
    private String newEmail;

    public String getNewUsername() {
        return newEmail;
    }
}