package com.vasic.project_board.service;

import com.vasic.project_board.domain.Backlog;
import com.vasic.project_board.domain.Project;
import com.vasic.project_board.exceptions.ProjectIdException;
import com.vasic.project_board.repository.BacklogRepository;
import com.vasic.project_board.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;


    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public Project saveOrUpdateProject(Project project) {

        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

            //Create backlog when creating project
            if(project.getId() == null) {
                Backlog backlog = new Backlog();

                project.setBacklog(backlog);
                backlog.setProject(project);

                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }

            //Add backlog to project when updating the project
            if(project.getId() != null) {
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));

            }

            return projectRepository.save(project);
        } catch (Exception e) {
            ProjectIdException projectIdException =
                    new ProjectIdException("Project ID '"+project.getProjectIdentifier()+"' alreday exists ");
            throw projectIdException; // Calling CustomResponseEntityExceptionHandler
        }
    }

    public Project findProjectByIdentifier(String projectId) {

        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(project == null) {
            throw new ProjectIdException("Project ID '" + projectId + "' does not exist");
        }

        return project;
    }

    public void deleteProjectByIdentifier(String projectId) {

        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(project==null) {
            throw new ProjectIdException("Cannot delete Project with ID '" + projectId + "'. This project does not exist");
        }

        projectRepository.delete(project);
    }
}
