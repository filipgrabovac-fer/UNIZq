package com.educhat.backend.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.educhat.backend.models.PostImage;
import com.educhat.backend.repository.PostImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private PostImageRepository postImageRepository;

    public String uploadFileAndSaveToDatabase(File file, Long postId) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
        String imageUrl = (String) uploadResult.get("url");

        PostImage postImage = new PostImage();
        postImage.setPostId(postId);
        postImage.setLink(imageUrl);
        postImageRepository.save(postImage);

        return imageUrl;
    }
}