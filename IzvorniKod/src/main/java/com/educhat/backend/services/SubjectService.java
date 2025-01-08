package com.educhat.backend.services;

import com.educhat.backend.models.*;
import com.educhat.backend.models.enums.Role;
import com.educhat.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final FacultyUserRepository facultyUserRepository;
    private final FacultyYearRepository facultyYearRepository;
    private final UserRepository userRepository;

    public List<Subject> getAllSubjects(Long facultyYearId) {
        return subjectRepository.findByFacultyYearId(facultyYearId);
    }

    public ResponseEntity<String> createSubject(Long userId, Long facultyYearId, String title, String description) {

        if (facultyYearRepository.findById(facultyYearId).isEmpty() || title == null || description == null)
            return ResponseEntity.badRequest().build();

        FacultyYear facultyYear = facultyYearRepository.findById(facultyYearId).get();

        if (facultyYear.getId() == null)
            return ResponseEntity.badRequest().build();

        Optional<FacultyUser> facultyUser = facultyUserRepository.findByFacultyIdAndUserId(facultyYear.getFacultyId(),userId);

        if(facultyUser.isPresent()) {
            var subject = Subject.builder().title(title)
                    .description(description)
                    .facultyUserId(facultyUser.get().getId())
                    .facultyYearId(facultyYearId)
                    .build();
            subjectRepository.save(subject);
            return ResponseEntity.ok(subject.toString());
        }
        return ResponseEntity.badRequest().build();
    }

    public ResponseEntity<String> deleteSubject(Long userId, Long subjectId, Long facultyYearId){
        if (facultyYearRepository.findById(facultyYearId).isEmpty() || subjectRepository.findById(subjectId).isEmpty())
            return ResponseEntity.notFound().build();

        FacultyYear facultyYear = facultyYearRepository.findById(facultyYearId).get();

        if (facultyYear.getId() == null)
            return ResponseEntity.badRequest().build();

        Optional<FacultyUser> facultyUser = facultyUserRepository.findByFacultyIdAndUserId(facultyYear.getFacultyId(),userId);
        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) return ResponseEntity.badRequest().build();

        if(facultyUser.isPresent() && facultyUser.get().getRole() == Role.ADMIN || user.get().getRole() == Role.ADMIN) {
            subjectRepository.deleteById(subjectId);
            return ResponseEntity.ok("Successfully deleted subject with id" + subjectId);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
