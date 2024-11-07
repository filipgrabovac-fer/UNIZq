package com.educhat.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        if (isDevelopment()) {
            Dotenv dotenv = Dotenv.configure()
                    .directory("izvorniKod/backend")
                    .ignoreIfMissing()
                    .load();

            dotenv.entries().forEach(entry -> {
                System.setProperty(entry.getKey(), entry.getValue());
            });
        }
        SpringApplication.run(BackendApplication.class, args);
    }

    private static boolean isDevelopment() {
        String env = System.getenv("ENVIRONMENT");
        return env == null || env.equals("development");
    }
}
