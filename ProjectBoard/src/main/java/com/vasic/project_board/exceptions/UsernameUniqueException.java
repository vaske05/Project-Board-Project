package com.vasic.project_board.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UsernameUniqueException extends RuntimeException {
    public UsernameUniqueException(String message) {
        super(message);
    }
}
