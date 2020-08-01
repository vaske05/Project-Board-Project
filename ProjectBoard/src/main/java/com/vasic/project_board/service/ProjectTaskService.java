package com.vasic.project_board.service;

import com.vasic.project_board.domain.Backlog;
import com.vasic.project_board.domain.Project;
import com.vasic.project_board.domain.ProjectTask;
import com.vasic.project_board.exceptions.ProjectIdException;
import com.vasic.project_board.exceptions.ProjectNotFoundException;
import com.vasic.project_board.repository.BacklogRepository;
import com.vasic.project_board.repository.ProjectRepository;
import com.vasic.project_board.repository.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Null;
import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    ProjectTaskRepository projectTaskRepository;
    @Autowired
    BacklogRepository backlogRepository;
    @Autowired
    ProjectRepository projectRepository;

    public ProjectTask saveOrUpdateProjectTask(String backlog_id, ProjectTask projectTask) {

        try {
            //Exceptions: project not found

            //PTs to be added to a specific project
            Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
            //Set the BL to PT
            projectTask.setBacklog(backlog);

            // We want our project sequence to be like this: IDPRO-1, IDPRO-2
            Integer backlogSequence = backlog.getPTSequence();
            // Update the BL sequence
            backlogSequence++;
            backlog.setPTSequence(backlogSequence);

            // Add sequence to Project Task
            projectTask.setProjectSequence(backlog_id + "-" + backlogSequence);
            projectTask.setProjectIdentifier(backlog_id);

            // INITIAL priority when priority is NULL
            if(projectTask.getPriority() == 0 || projectTask.getPriority() == null) {
                projectTask.setPriority(3);
            }

            // INITIAL status when status is NULL
            if( projectTask.getStatus() == "" || projectTask.getStatus() == null) {
                projectTask.setStatus("TO_DO");
            }

            return projectTaskRepository.save(projectTask);

        } catch (Exception e) {
            throw new ProjectNotFoundException("Project not found!");
        }

    }

    public Iterable<ProjectTask> findAll() {
        return projectTaskRepository.findAll();
    }

    public ProjectTask findById(Long id) {
        return projectTaskRepository.getById(id);
    }

    public void delete(Long id) {
        ProjectTask projectTask = findById(id);
        projectTaskRepository.delete(projectTask);
    }

    public Iterable<ProjectTask> findBacklogByIdentifier(String backlogId) {
        Project project = projectRepository.findByProjectIdentifier(backlogId); // projectIdentifier = backlogId
        if(project == null) {
            throw new ProjectNotFoundException("Project wit ID: '" + backlogId + "' does not exist");
        }

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlogId);
    }

    public ProjectTask findProjectTaskByProjectSequence(String projectIdentifier, String pt_id) {

        // make sure we are searching on an existing backlog
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        if(backlog == null) {
            throw new ProjectNotFoundException("Project wit ID: '" + projectIdentifier + "' does not exist");
        }

        // make sure that our task exists
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
        if(projectTask == null) {
            throw new ProjectNotFoundException("Project Task : '" + pt_id + "' not found");
        }

        // make sure that the backlog/project ID in the path corresponds to the right project
        if(!projectTask.getProjectIdentifier().equals(projectIdentifier)) {
            throw new ProjectNotFoundException("Project Task : '" + pt_id + "' does not exist in project: '" + projectIdentifier + "'");
        }

        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedProjectTask, String project_identifier, String pt_id) {

        ProjectTask projectTask = findProjectTaskByProjectSequence(project_identifier, pt_id);

        projectTask = updatedProjectTask;
        return projectTaskRepository.save(projectTask);
    }

    public void deleteProjectTaskByProjectSequence(String project_identifier, String pt_id) {

        ProjectTask projectTask = findProjectTaskByProjectSequence(project_identifier, pt_id);

        projectTaskRepository.delete(projectTask);
    }
}
