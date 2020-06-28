package com.vasic.project_board.controller;

import com.vasic.project_board.service.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.vasic.project_board.domain.Project;
import com.vasic.project_board.service.ProjectService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    ProjectService projectService;
    @Autowired
    ValidationErrorService errorService;

    @PostMapping("/create")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result) {

        ResponseEntity<?>errorMap = errorService.validateFields(result);
        if(errorMap != null) { return errorMap; }

        Project createdProject = projectService.saveOrUpdateProject(project);
        return new ResponseEntity<Project>(createdProject, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Project> findAllProjects(@RequestBody Project project) {
        return projectService.findAll();
    }
}
