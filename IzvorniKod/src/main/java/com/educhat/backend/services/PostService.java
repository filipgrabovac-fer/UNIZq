package com.educhat.backend.services;

import com.educhat.backend.DTO.PostResponseDTO;
import com.educhat.backend.exceptions.SubjectNotFoundException;
import com.educhat.backend.exceptions.UserNotFoundException;
import com.educhat.backend.models.Post;
import com.educhat.backend.repository.PostRepository;
import com.educhat.backend.repository.SubjectRepository;
import com.educhat.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final SubjectRepository subjectRepository;

    public List<PostResponseDTO> getPostsBySubject(Long subjectId, Long userId) {
        if(!userRepository.existsById(userId)) {
            throw new UserNotFoundException("User not found");
        }
        if(!subjectRepository.existsById(subjectId)) {
            throw new SubjectNotFoundException("Subject not found");
        }
        List<Post> posts = postRepository.findBySubjectId(subjectId);

        return posts.stream()
                .map(post -> new PostResponseDTO(
                        post.getId(),
                        post.getTitle(),
                        post.getDescription(),
                        post.getFacutlyUserId(),
                        post.getSubjectId(),
                        post.getUpvotes(),
                        post.getDownvotes(),
                        post.getReports(),
                        post.isActive(),
                        post.getType(),
                        false ))
                .collect(Collectors.toList());
    }


}
