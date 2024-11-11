package com.educhat.backend.config;

import com.educhat.backend.services.CustomOAuth2UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;

@Configuration
@EnableWebSecurity
public class WebConfig {

    private final CustomOAuth2UserService customOAuth2UserService;

    private final Logger log = LoggerFactory.getLogger(WebConfig.class);

    public WebConfig(CustomOAuth2UserService customOAuth2UserService) {
        this.customOAuth2UserService = customOAuth2UserService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/login", "/register", "/oauth2/**", "/error").permitAll()
                                .anyRequest().authenticated()
                )
                .oauth2Login(oauth2Login ->
                        oauth2Login
                                .userInfoEndpoint(userInfoEndpoint ->
                                        userInfoEndpoint.userService(customOAuth2UserService)
                                )
                                .successHandler(this::oauth2AuthenticationSuccessHandler)
                )
                .formLogin(formLogin ->
                        formLogin
                                .loginPage("/login")
                                .permitAll()
                )
                .logout(logout -> logout.permitAll());
        return http.build();
    }

    private void oauth2AuthenticationSuccessHandler(HttpServletRequest request, HttpServletResponse response,
                                                    Authentication authentication) throws IOException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

        log.info("OAuth2 Authentication Successful, redirecting to frontend home");
        log.info("Authenticated Principal: Name: [{}], Granted Authorities: [{}], User Attributes: [{}]",
                oauth2User.getName(), oauth2User.getAuthorities(), oauth2User.getAttributes());

        customOAuth2UserService.saveUser(oauth2User);
        response.sendRedirect("http://localhost:5173/home");
    }
}

