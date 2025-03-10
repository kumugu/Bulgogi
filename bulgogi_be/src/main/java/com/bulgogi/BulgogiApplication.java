package com.bulgogi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BulgogiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BulgogiApplication.class, args);
	}

}
