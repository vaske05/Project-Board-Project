package com.vasic.project_board.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.vasic.project_board.domain.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

	@Override
	Iterable<Project> findAll();
	Project findByProjectIdentifier(String projectId);
}
