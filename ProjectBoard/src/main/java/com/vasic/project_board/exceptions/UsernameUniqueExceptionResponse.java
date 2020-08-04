package com.vasic.project_board.exceptions;

public class UsernameUniqueExceptionResponse {

    private String usernameAlreadyExist;

    public UsernameUniqueExceptionResponse(String exceptionResponse) {
        this.usernameAlreadyExist = exceptionResponse;
    }

    public String getUsernameAlreadyExist() {
        return usernameAlreadyExist;
    }

    public void setUsernameAlreadyExist(String usernameAlreadyExist) {
        this.usernameAlreadyExist = usernameAlreadyExist;
    }
}
