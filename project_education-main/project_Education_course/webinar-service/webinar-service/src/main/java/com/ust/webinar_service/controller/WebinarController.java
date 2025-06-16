package com.ust.webinar_service.controller;

import com.ust.webinar_service.model.Webinar;
import com.ust.webinar_service.service.WebinarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/webinars")
@CrossOrigin(origins = { "http://localhost:4200", "http://127.0.0.1:4200" }, allowCredentials = "true")
public class WebinarController {

    @Autowired
    private WebinarService webinarService;

    // Fetch all webinars
    @GetMapping
    @CrossOrigin(origins = { "http://localhost:4200", "http://127.0.0.1:4200" }, allowCredentials = "true")
    public Flux<Webinar> getAllWebinars() {
        return webinarService.getAllWebinars();
    }

    // Fetch a webinar by ID
    @GetMapping("/{id}")
    @CrossOrigin(origins = { "http://localhost:4200", "http://127.0.0.1:4200" }, allowCredentials = "true")
    public Mono<Webinar> getWebinarById(@PathVariable String id) {
        return webinarService.getWebinarById(id);
    }

    // Create a new webinar
    @PostMapping
    @CrossOrigin(origins = { "http://localhost:4200", "http://127.0.0.1:4200" }, allowCredentials = "true")
    public Mono<ResponseEntity<Webinar>> createWebinar(@RequestBody Webinar webinar) {
        return webinarService.addWebinar(webinar)
                .map(createdWebinar -> ResponseEntity.status(HttpStatus.CREATED).body(createdWebinar));
    }
}
