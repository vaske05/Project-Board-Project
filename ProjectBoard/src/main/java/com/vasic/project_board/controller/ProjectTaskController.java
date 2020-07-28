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
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/board")
@CrossOrigin                            //React app Access
public class ProjectTaskController {

    @Autowired
    ProjectTaskService projectTaskService;

    private static final Logger LOGGER = Logger.getLogger(ProjectTaskController.class.getName());
// VEROVATNO SE BRISE SVE
//    @PostMapping("/create")
//    public ResponseEntity<?> addProjectTaskToBoard(@Valid @RequestBody ProjectTask projectTask, BindingResult result) {
//        if(result.hasErrors()) {
//            Map<String, String> errorMap = new HashMap<>();
//
//            for(FieldError error: result.getFieldErrors()) {
//                errorMap.put(error.getField(), error.getDefaultMessage());
//            }
//
//            return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
//        }
//        // ProjectTask newProjectTask = projectTaskService.saveOrUpdateProjectTask(projectTask);
//        LOGGER.log(Level.INFO, "Project task - created: summary = " + newProjectTask.getSummary());
//
//        return new ResponseEntity<ProjectTask>(newProjectTask, HttpStatus.CREATED);
//    }

    @GetMapping("/all")
    public Iterable<ProjectTask> findAllProjectTasks() {
        return projectTaskService.findAll();
    }

    @GetMapping("/get/{pt_id}")
    public ResponseEntity<?> getProjectTaskById(@PathVariable Long pt_id) {

        ProjectTask projectTask = projectTaskService.findById(pt_id);

        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{pt_id}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable Long pt_id) {

        projectTaskService.delete(pt_id);
        LOGGER.log(Level.INFO, "Project task - deleted: id = " + pt_id);

        return new ResponseEntity<String>("Project task deleted", HttpStatus.OK);
    }
}
