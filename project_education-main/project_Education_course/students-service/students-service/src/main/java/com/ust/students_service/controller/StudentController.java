package com.ust.students_service.controller;

import com.ust.students_service.model.Student;
import com.ust.students_service.repository.StudentRepository;
import com.ust.students_service.service.WebinarService;
import com.ust.students_service.dto.Webinar;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = { "http://localhost:4200", "http://127.0.0.1:4200" }, allowCredentials = "true")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private WebinarService webinarService;

    // Fetch webinar with associated students
    @GetMapping("/webinar/{webinarId}")
    @CrossOrigin(origins = { "http://localhost:4200", "http://127.0.0.1:4200" }, allowCredentials = "true")
    public Mono<Webinar> getWebinarWithStudents(@PathVariable String webinarId) {
        return webinarService.getWebinarById(webinarId)
                .flatMap(webinar -> studentRepository.findByWebinarId(webinarId).collectList()
                        .map(students -> {
                            webinar.setStudents(students);
                            return webinar;
                        }));
    }

    // Add student details with validation
    @PostMapping
    @CrossOrigin(origins = { "http://localhost:4200", "http://127.0.0.1:4200" }, allowCredentials = "true")
    public Mono<Student> addStudent(@Valid @RequestBody Student student) {
        return studentRepository.save(student);
    }

    // Fetch student details by student ID
    @GetMapping("/{studentId}")
    @CrossOrigin(origins = { "http://localhost:4200", "http://127.0.0.1:4200" }, allowCredentials = "true")
    public Mono<Student> getStudentById(@PathVariable String studentId) {
        return studentRepository.findById(studentId);
    }
}
