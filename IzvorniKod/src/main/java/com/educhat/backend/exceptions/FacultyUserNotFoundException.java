package com.educhat.backend.exceptions;

public class FacultyUserNotFoundException extends RuntimeException{

    public FacultyUserNotFoundException(String message) {
        super(message);
    }

}
