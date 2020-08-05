package com.vasic.project_board.service;

import com.vasic.project_board.domain.Backlog;
import com.vasic.project_board.domain.Project;
import com.vasic.project_board.domain.User;
import com.vasic.project_board.exceptions.ProjectIdException;
import com.vasic.project_board.exceptions.ProjectNotFoundException;
import com.vasic.project_board.repository.BacklogRepository;
import com.vasic.project_board.repository.ProjectRepository;
import com.vasic.project_board.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private UserRepository userRepository;


    public Iterable<Project> findAllProjects(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }

    public Project saveOrUpdateProject(Project project, String username) {

        // Update project only if they belongs to user, throw exception if not.
        if(project.getId() != null) {
            Project existingProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());

            if(existingProject != null && (!existingProject.getProjectLeader().equals(username))) {
                throw new ProjectNotFoundException("Project not found in your account");
            } else if(existingProject == null) {
                throw new ProjectNotFoundException("Project with ID: '"
                        + project.getProjectIdentifier() + "' cannot be updated because it doesn't exist");
            }
        }

        try {
            User user = userRepository.findByUsername(username);
            project.setUser(user); // Set OneToMany relationship

            project.setProjectLeader(user.getUsername());

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
                    new ProjectIdException("Project ID '"+project.getProjectIdentifier()+"' already exists ");
            throw projectIdException; // Calling CustomResponseEntityExceptionHandler
        }
    }

    public Project findProjectByIdentifier(String projectId, String username) {

        // Only want to return the project if the user looking for it is the owner

        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if(project == null) {
            throw new ProjectIdException("Project ID '" + projectId + "' does not exist");
        }

        if(!project.getProjectLeader().equals(username)) {
            throw new ProjectNotFoundException("Project not found in your account");
        }

        return project;
    }

    public void deleteProjectByIdentifier(String projectId, String username) {

        projectRepository.delete(findProjectByIdentifier(projectId, username));
    }
}
