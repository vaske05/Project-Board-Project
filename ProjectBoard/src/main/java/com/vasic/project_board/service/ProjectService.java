package com.vasic.project_board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vasic.project_board.domain.Project;
import com.vasic.project_board.repository.ProjectRepository;

@Service
public class ProjectService {
	
	@Autowired
	ProjectRepository projectRepository;
	
	public Project saveOrUpdateProject(Project project) {
		return projectRepository.save(project);
	}

	public Iterable<Project> findAll() {
		return projectRepository.findAll();
	}
}
