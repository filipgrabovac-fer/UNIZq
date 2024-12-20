package com.educhat.backend.exceptions;

public class SubjectNotFoundException extends RuntimeException {

    public SubjectNotFoundException(String message) {
        super(message);
    }
}
