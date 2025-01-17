package com.educhat.backend.controllers;

import com.educhat.backend.DTO.CreateSubjectDTO;
import com.educhat.backend.models.Subject;
import com.educhat.backend.repository.FacultyYearRepository;
import com.educhat.backend.repository.SubjectRepository;
import com.educhat.backend.services.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin("*")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping("/year/{facultyYearId}")
    public ResponseEntity<List<Subject>> getSubjectsByFacultyYear(@PathVariable Long facultyYearId) {
        List<Subject> subjects = subjectService.getAllSubjects(facultyYearId);
        return ResponseEntity.ok(subjects);
    }

    @PostMapping("/year/{facultyYearId}/user/{userId}")
    public ResponseEntity<Boolean> createSubject(@PathVariable Long facultyYearId,@PathVariable Long userId, @RequestBody CreateSubjectDTO subject) {

        String newSubject = subjectService.createSubject(userId, facultyYearId, subject.getTitle(), subject.getDescription());
        if (newSubject == null) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(true);
    }

    @DeleteMapping("/year/{facultyYearId}/subject/{subjectId}/user/{userId}")
    public ResponseEntity<String> deleteSubject(@PathVariable Long subjectId,@PathVariable Long userId, @PathVariable Long facultyYearId) {
        return subjectService.deleteSubject(userId, subjectId,facultyYearId);

    }
}
