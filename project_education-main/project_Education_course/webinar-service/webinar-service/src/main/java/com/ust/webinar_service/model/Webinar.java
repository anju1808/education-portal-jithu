package com.ust.webinar_service.model;

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
}
