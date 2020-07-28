package com.vasic.project_board.service;

import com.vasic.project_board.domain.Backlog;
import com.vasic.project_board.domain.ProjectTask;
import com.vasic.project_board.repository.BacklogRepository;
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

    public ProjectTask saveOrUpdateProjectTask(String projectIdentifier, ProjectTask projectTask) {

        //Exceptions: project not found

        //PTs to be added to a specific project
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        //Set the BL to PT
        projectTask.setBacklog(backlog);

        // We want our project sequence to be like this: IDPRO-1, IDPRO-2
        Integer backlogSequence = backlog.getPTSequence();
        // Update the BL sequence
        backlogSequence++;
        backlog.setPTSequence(backlogSequence);

        // Add sequence to Project Task
        projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        // INITIAL priority when priority is NULL
        if(projectTask.getPriority() == null || projectTask.getPriority() == 0) {
            projectTask.setPriority(3);
        }

        // INITIAL status when status is NULL
        if(projectTask.getStatus() == null || projectTask.getStatus() == "") {
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);
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

    public Iterable<ProjectTask> findBacklogByIdentifier(String projectIdentifier) {
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }
}
