package com.educhat.backend.exceptions;

public class FacultyUserAlreadyExistsException extends RuntimeException{

    public FacultyUserAlreadyExistsException(String message) {
        super(message);
    }

}
