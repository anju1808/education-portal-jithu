package com.ust.webinar_service.repository;

import com.ust.webinar_service.model.Webinar;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class WebinarRepository {
    private final Map<String, Webinar> webinars = new ConcurrentHashMap<>();

    public WebinarRepository() {
        // Initialize with some static data
        webinars.put("1", new Webinar("1", "Introduction to Spring Boot", "John Smith", "2024-03-20T10:00:00",
                "2024-03-20T12:00:00"));
        webinars.put("2", new Webinar("2", "Advanced Java Programming", "Sarah Johnson", "2024-03-21T14:00:00",
                "2024-03-21T16:00:00"));
        webinars.put("3", new Webinar("3", "Microservices Architecture", "Mike Brown", "2024-03-22T09:00:00",
                "2024-03-22T11:00:00"));
        webinars.put("4",
                new Webinar("4", "Cloud Computing Basics", "Lisa Davis", "2024-03-23T13:00:00", "2024-03-23T15:00:00"));
    }

    public Flux<Webinar> findAll() {
        return Flux.fromIterable(webinars.values());
    }

    public Mono<Webinar> findById(String id) {
        return Mono.justOrEmpty(webinars.get(id));
    }

    public Flux<Webinar> findByTutor(String tutor) {
        return Flux.fromIterable(webinars.values())
                .filter(webinar -> webinar.getTutor().equals(tutor));
    }

    public Mono<Webinar> save(Webinar webinar) {
        if (webinar.getId() == null) {
            webinar.setId(String.valueOf(webinars.size() + 1));
        }
        webinars.put(webinar.getId(), webinar);
        return Mono.just(webinar);
    }
}
