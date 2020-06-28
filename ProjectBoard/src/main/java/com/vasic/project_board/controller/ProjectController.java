package com.vasic.project_board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vasic.project_board.domain.Project;
import com.vasic.project_board.service.ProjectService;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
	
	@Autowired
	ProjectService projectService;
	
	@PostMapping("/create")
	public ResponseEntity<Project> createNewProject(@RequestBody Project project) {
		Project project1 = projectService.saveOrUpdateProject(project);
		return new ResponseEntity<Project>(project, HttpStatus.CREATED);
	}

	@GetMapping("/all")
	public Iterable<Project> findAllProjects(@RequestBody Project project) {
		return projectService.findAll();
	}
}
