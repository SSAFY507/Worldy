package com.ssafy.worldy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class WorldyApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorldyApplication.class, args);
	}
}
