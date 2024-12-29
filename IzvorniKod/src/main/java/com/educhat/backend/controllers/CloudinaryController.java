package com.educhat.backend.controllers;

import com.educhat.backend.services.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/upload")
public class CloudinaryController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("postId") Long postId) {
        try {
            // Save the file locally (temporarily)
            File tempFile = File.createTempFile("upload", file.getOriginalFilename());
            file.transferTo(tempFile);

            // Upload to Cloudinary and save to the database
            String uploadedUrl = cloudinaryService.uploadFileAndSaveToDatabase(tempFile, postId);

            // Delete temporary file
            tempFile.delete();

            return ResponseEntity.ok(uploadedUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
        }
    }
}