package com.educhat.backend.exceptions;

public class ApplicationAlreadyApprovedException extends RuntimeException {
    public ApplicationAlreadyApprovedException(String message) {
        super(message);
    }
}
