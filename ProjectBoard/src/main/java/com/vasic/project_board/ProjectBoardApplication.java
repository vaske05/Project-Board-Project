package com.vasic.project_board;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.Entity;

@EnableAutoConfiguration
@SpringBootApplication
public class ProjectBoardApplication {

	@Bean
	BCryptPasswordEncoder bCryptPasswordEncoder () {
		return new BCryptPasswordEncoder();
	}
	public static void main(String[] args) {
		SpringApplication.run(ProjectBoardApplication.class, args);
	}
}
