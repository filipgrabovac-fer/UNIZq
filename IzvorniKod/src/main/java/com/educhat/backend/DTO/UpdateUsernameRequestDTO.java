package com.educhat.backend.DTO;

import jakarta.validation.constraints.NotNull;

public class UpdateUsernameRequestDTO {
    @NotNull
    private String newUsername;

    public String getNewUsername() {
        return newUsername;
    }

    public void setNewUsername(String newUsername) {
        this.newUsername = newUsername;
    }
}
