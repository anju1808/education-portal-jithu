package com.ust.students_service.repository;

import com.ust.students_service.model.Student;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class StudentRepository {
    private final Map<String, Student> students = new ConcurrentHashMap<>();

    public StudentRepository() {
        // Initialize with some static data
        students.put("1", new Student("1", "John Doe", "john@example.com", "1"));
        students.put("2", new Student("2", "Jane Smith", "jane@example.com", "1"));
        students.put("3", new Student("3", "Bob Johnson", "bob@example.com", "2"));
        students.put("4", new Student("4", "Alice Brown", "alice@example.com", "2"));
    }

    public Flux<Student> findAll() {
        return Flux.fromIterable(students.values());
    }

    public Mono<Student> findById(String id) {
        return Mono.justOrEmpty(students.get(id));
    }

    public Flux<Student> findByWebinarId(String webinarId) {
        return Flux.fromIterable(students.values())
                .filter(student -> student.getWebinarId().equals(webinarId));
    }

    public Mono<Student> save(Student student) {
        if (student.getId() == null) {
            student.setId(String.valueOf(students.size() + 1));
        }
        students.put(student.getId(), student);
        return Mono.just(student);
    }
}
