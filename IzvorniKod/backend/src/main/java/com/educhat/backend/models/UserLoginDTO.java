package com.educhat.backend.models;

import lombok.Data;

@Data
public class UserLoginDTO {
    private String usernameOrEmail;
    private String password;
}
