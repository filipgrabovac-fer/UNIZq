package com.educhat.backend.controllers;
import com.educhat.backend.DTO.VertexAIDTO;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.preview.GenerativeModel;
import com.google.cloud.vertexai.generativeai.preview.ResponseHandler;
import com.nimbusds.jose.JSONSerializable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin("*")
@RequestMapping(path="/api/ai")
public class VertexAIController {

    public final GenerativeModel generativeModel;

    public VertexAIController(GenerativeModel generativeModel) {
        this.generativeModel = generativeModel;
    }

    // Passes the provided text input to the Gemini model and returns the text-only response.
    // For the specified textPrompt, the model returns a list of possible store names.
    @PostMapping(path = "/generate-answer")
    public ResponseEntity<Map<String, String>> generateGeminiResponse(@RequestBody VertexAIDTO question) throws IOException {

        if (question == null || question.getQuestion() == null) ResponseEntity.badRequest();

        GenerateContentResponse contentResponse = this.generativeModel.generateContent(question.getQuestion());
        String generatedAnswer = ResponseHandler.getText(contentResponse).replaceAll("[*#]", "");
        Map<String,String> response = new HashMap<>();
        response.put("answer", generatedAnswer);
        return ResponseEntity.ok(response);
    }
}