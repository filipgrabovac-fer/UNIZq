package com.educhat.backend.models;

import com.educhat.backend.models.enums.LoginType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static org.springframework.security.config.oauth2.client.CommonOAuth2Provider.GOOGLE;

@Entity
@Data
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String username;

    @NotNull
    private String email;
    private String password;
    private String token;

    @NotNull
    private LoginType loginType;
}
