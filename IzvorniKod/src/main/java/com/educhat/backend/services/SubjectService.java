package com.educhat.backend.services;

import com.educhat.backend.models.Faculty;
import com.educhat.backend.models.FacultyUser;
import com.educhat.backend.models.FacultyYear;
import com.educhat.backend.models.Subject;
import com.educhat.backend.repository.FacultyRepository;
import com.educhat.backend.repository.FacultyUserRepository;
import com.educhat.backend.repository.FacultyYearRepository;
import com.educhat.backend.repository.SubjectRepository;
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
}
