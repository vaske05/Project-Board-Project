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
import java.security.Principal;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@CrossOrigin
@RequestMapping("/api/project")
public class ProjectController {

    ProjectService projectService;
    ValidationErrorService errorService;

    ProjectController(ProjectService projectService, ValidationErrorService errorService) {
        this.projectService = projectService;
        this.errorService = errorService;
    }

    private static final Logger LOGGER = Logger.getLogger(ProjectController.class.getName());


    @PostMapping("/create")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal) {

        ResponseEntity<?>errorMap = errorService.validateFields(result);
        if(errorMap != null) { return errorMap; }

        Project createdProject = projectService.saveOrUpdateProject(project, principal.getName());
        LOGGER.log(Level.INFO, "Project - created: " + project.getProjectName());

        return new ResponseEntity<Project>(createdProject, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Project> getAllProjects(Principal principal) {
        return projectService.findAllProjects(principal.getName());
    }

    @GetMapping("/get/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectId, Principal principal) {

        Project project = projectService.findProjectByIdentifier(projectId, principal.getName());

        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectId, Principal principal) {

        projectService.deleteProjectByIdentifier(projectId, principal.getName());

        LOGGER.log(Level.INFO, "Project - deleted: id: " + projectId);
        return new ResponseEntity<String>("Project with ID: '" + projectId + "' was deleted.", HttpStatus.OK);
    }
}
