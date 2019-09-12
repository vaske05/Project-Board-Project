package com.vasic.project_board.controller;

import com.vasic.project_board.domain.ProjectTask;
import com.vasic.project_board.service.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/board")
@CrossOrigin                            //React app Access
public class ProjectTaskController {

    @Autowired
    ProjectTaskService projectTaskService;

    @PostMapping("/create")
    public ResponseEntity<?> addProjectTaskToBoard(@Valid @RequestBody ProjectTask projectTask, BindingResult result) {
        if(result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();

            for(FieldError error: result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }

            return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
        }
        ProjectTask newProjectTask = projectTaskService.saveOrUpdateProjectTask(projectTask);
        return new ResponseEntity<ProjectTask>(newProjectTask, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<ProjectTask> findAllProjectTasks() {
        return projectTaskService.findAll();
    }

    @GetMapping("/{pt_id}")
    public ResponseEntity<?> getProjectTaskById(@PathVariable Long pt_id) {
        ProjectTask projectTask = projectTaskService.findById(pt_id);

        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @DeleteMapping("/{pt_id}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable Long pt_id) {
        projectTaskService.delete(pt_id);

        return new ResponseEntity<String>("Project task deleted", HttpStatus.OK);
    }

}
