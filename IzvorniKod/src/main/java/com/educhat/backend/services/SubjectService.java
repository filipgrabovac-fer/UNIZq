package com.educhat.backend.services;

import com.educhat.backend.models.Subject;
import com.educhat.backend.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;

    public List<Subject> getAllSubjects(Long facultyYearId) {
        return subjectRepository.findByFacultyYearId(facultyYearId);
    }

}
