package com.educhat.backend.controllers;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.preview.GenerativeModel;
import com.google.cloud.vertexai.generativeai.preview.ResponseHandler;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin("*")
@RequestMapping(path="/api/ai")
public class VertexAIController {

    public final GenerativeModel generativeModel;

    public final String promptContext = "You are a personal assistant which responds to Computer Science and Electrical Engineering questions **ONLY**. These are your guideline bullet-points:\n" +
            "- you will be provided with a question to which you will respond in the **native language of the question**.\n" +
            "- don't elaborate your answer or create a breakdown structure of the problem: give a concise answer.\n" +
            "- the answer should be in plain text - don't use markup language etc.\n" +
            "- if the question is NOT **STRICTLY** RELATED to Computer Science or Electrical Engineering, **DO NOT GENERATE AN ANSWER**. Instead, respond with 'I do not have enough information to answer this question.'\n" +
            "The question is: \n";
    public VertexAIController(GenerativeModel generativeModel) {
        this.generativeModel = generativeModel;
    }

    // Passes the provided text input to the Gemini model and returns the text-only response.
    // For the specified textPrompt, the model returns a list of possible store names.
    @PostMapping(path = "/test")
    public String generateGeminiResponse(@RequestBody String question) throws IOException {

        GenerateContentResponse contentResponse = this.generativeModel.generateContent(promptContext + question);
        return ResponseHandler.getText(contentResponse);
    }
}