package com.vasic.project_board.exceptions;

//Response model of Project id exception
public class ProjectIdExceptionResponse {
    private String projectIdentifier;

    public ProjectIdExceptionResponse(String exceptionMessage) { //Exception message of project identifier
        this.projectIdentifier = exceptionMessage;
    }

    public String getProjectIdentifier() {
        return projectIdentifier;
    }

    public void setProjectIdentifier(String exceptionMessage) {
        this.projectIdentifier = exceptionMessage;
    }
}
