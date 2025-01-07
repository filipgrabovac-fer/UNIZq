package com.educhat.backend.controllers;

import com.educhat.backend.services.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
public class CloudinaryController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Save the file locally (temporarily)
            File tempFile = File.createTempFile("upload", file.getOriginalFilename());
            file.transferTo(tempFile);

            // Upload to Cloudinary and save to the database
            String uploadedUrl = cloudinaryService.uploadFile(tempFile);

            // Delete temporary file
            tempFile.delete();

            return ResponseEntity.ok(uploadedUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
        }
    }

    @GetMapping("/images")
    public List<Map> getAllImages() throws Exception {
        return cloudinaryService.getAllImages();
    }

    @GetMapping("/images/{publicId}")
    public Map getImageDetails(@PathVariable String publicId) throws Exception {
        return cloudinaryService.getImageDetails(publicId);
    }

}