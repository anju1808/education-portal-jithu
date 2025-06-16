package com.ust.students_service.dto;

import java.util.List;

import com.ust.students_service.model.Student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Webinar {
    private String id;
    private String title;
    private String tutor;
    private String startTime;
    private String endTime;
    private List<Student> students;

}
