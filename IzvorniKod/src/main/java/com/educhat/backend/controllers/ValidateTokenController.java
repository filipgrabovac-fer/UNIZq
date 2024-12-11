package com.educhat.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class ValidateTokenController {

    @GetMapping("/validate-token")
    public ResponseEntity<Void> validateToken() {
        return ResponseEntity.ok().build();
    }

}
