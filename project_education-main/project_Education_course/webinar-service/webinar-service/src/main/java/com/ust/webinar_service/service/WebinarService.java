package com.ust.webinar_service.service;

import com.ust.webinar_service.model.Webinar;
import com.ust.webinar_service.repository.WebinarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class WebinarService {

    @Autowired
    private WebinarRepository webinarRepository;

    // Fetch all webinars
    public Flux<Webinar> getAllWebinars() {
        return webinarRepository.findAll();
    }

    // Fetch a webinar by ID
    public Mono<Webinar> getWebinarById(String id) {
        return webinarRepository.findById(id);
    }

    // Add a new webinar
    public Mono<Webinar> addWebinar(Webinar webinar) {
        return webinarRepository.save(webinar);
    }
}
