package com.vasic.project_board.exceptions;

public class ProjectNotFoundExceptionResponse {

    private String projectNotFound;

    public ProjectNotFoundExceptionResponse(String exceptionMessage) {
        this.projectNotFound = exceptionMessage;
    }

    public String getProjectNotFound() {
        return projectNotFound;
    }

    public void setProjectNotFound(String exceptionMessage) {
        this.projectNotFound = exceptionMessage;
    }
}
