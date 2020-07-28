package com.vasic.project_board.repository;

import com.vasic.project_board.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {

    ProjectTask getById(Long id);
    ProjectTask findByProjectSequence(String projectSequence);

    List<ProjectTask> findByProjectIdentifierOrderByPriority(String id);

}
