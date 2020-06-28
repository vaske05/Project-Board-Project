package com.vasic.project_board.service;

import com.vasic.project_board.domain.Project;
import com.vasic.project_board.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    public Iterable<Project> findAll() {
        return projectRepository.findAll();
    }

    public Project saveOrUpdateProject(Project project) {
        return projectRepository.save(project);
    }
}
