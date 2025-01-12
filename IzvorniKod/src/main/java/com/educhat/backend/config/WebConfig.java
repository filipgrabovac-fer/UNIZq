package com.educhat.backend.config;

import com.educhat.backend.filters.JwtAuthenticationFilter;
import com.educhat.backend.services.CustomOAuth2UserService;
import com.educhat.backend.services.JwtService;
import io.jsonwebtoken.Jwt;
import jakarta.servlet.Filter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final CustomOAuth2UserService customOAuth2UserService;

    private final Logger log = LoggerFactory.getLogger(WebConfig.class);
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;


    @Value("${spring.datasource.username}")
    private String SECRET_KEY;

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        System.out.println(SECRET_KEY);
        
        registry.addViewController("/{path:^(?!api).}/*")
                .setViewName("forward:/index.html");
    }



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF as we're not using session cookies
                .csrf(csrf -> csrf.disable())

                // Configure URL authorization
                .authorizeHttpRequests(authorizeRequests ->
                                authorizeRequests
                                        // Allow JWT auth endpoints// Allow OAuth2 endpoints
                                        // .requestMatchers("/home", "/events").authenticated()
                                        .anyRequest().permitAll()
                )

                // Set session management to stateless for REST APIs
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Set authentication provider
                .authenticationProvider(authenticationProvider)

                // Add JWT authentication filter before UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

                // Exception handling to return 401 instead of redirecting
                //.exceptionHandling(exceptionHandling ->
                //       exceptionHandling.authenticationEntryPoint(customAuthenticationEntryPoint)
                //)

                .exceptionHandling(exceptionHandling ->
                                exceptionHandling.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                )


                // Configure OAuth2 login
                .oauth2Login(oauth2Login ->
                        oauth2Login
                                .userInfoEndpoint(userInfoEndpoint ->
                                        userInfoEndpoint.userService(customOAuth2UserService)
                                )
                                .successHandler(this::oauth2AuthenticationSuccessHandler)
                )

                // Disable form login to prevent default login page
                .formLogin(formLogin -> formLogin.disable())

                // Allow logout
                .logout(logout -> logout.permitAll());

        return http.build();
    }

    private void oauth2AuthenticationSuccessHandler(HttpServletRequest request, HttpServletResponse response,
                                                    Authentication authentication) throws IOException {

        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

        log.info("OAuth2 Authentication Successful, redirecting to frontend home");
        customOAuth2UserService.saveUser(oauth2User);

        String email = oauth2User.getAttribute("email");
        Long userId = customOAuth2UserService.getUserIdByEmail(email); // Fetch userId from DB
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        String jwt = jwtService.generateToken(userDetails, userId); // Include userId in JWT
        log.info("Generated JWT: [{}]", jwt);

        Cookie jwtCookie = new Cookie("jwtToken", jwt);
        jwtCookie.setPath("/");
        jwtCookie.setHttpOnly(false);
        jwtCookie.setSecure(true);
        jwtCookie.setMaxAge(24 * 60 * 60);
        response.addCookie(jwtCookie);
        response.sendRedirect("/home");
    }

}

