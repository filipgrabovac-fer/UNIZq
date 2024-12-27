package com.educhat.backend.config;
import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.generativeai.preview.GenerativeModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import java.io.IOException;


@Configuration
public class VertexAIConfig {

    @Value("${VERTEXAI_PROJECT_ID}")
    private String vertexAIProjectId;

    @Value("${VERTEXAI_MODEL}")
    private String vertexAIModel;

    @Bean
    public VertexAI vertexAI() throws IOException {
        return new VertexAI(vertexAIProjectId, "us-central1");
    }

    @Bean
    public GenerativeModel generativeModel(VertexAI vertexAI) throws IOException {
        return new GenerativeModel(vertexAIModel, vertexAI);
    }
}
