package com.educhat.backend.controllers;

import com.educhat.backend.models.Subject;
import com.educhat.backend.services.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


}
