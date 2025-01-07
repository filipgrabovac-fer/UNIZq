package com.educhat.backend.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadFile(File file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
        return (String) uploadResult.get("url"); // Return the URL of the uploaded file
    }

    public void deleteFile(String imageUrl) throws IOException {
        String publicId = extractPublicId(imageUrl);
        cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("invalidate", true));
    }

    private String extractPublicId(String imageUrl) {
        String[] parts = imageUrl.split("/");
        String publicIdWithExtension = parts[parts.length - 1];
        return publicIdWithExtension.split("\\.")[0];
    }

    /**
     * Fetch all images from Cloudinary account.
     */
    public List<Map> getAllImages() throws Exception {
        Map<String, Object> response = cloudinary.api().resources(ObjectUtils.emptyMap());
        return (List<Map>) response.get("resources");
    }

    /**
     * Get details of a specific image using its public ID.
     */
    public Map getImageDetails(String publicId) throws Exception {
        return cloudinary.api().resource(publicId, ObjectUtils.emptyMap());
    }

}