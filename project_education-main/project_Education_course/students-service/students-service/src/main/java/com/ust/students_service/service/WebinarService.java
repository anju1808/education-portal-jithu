package com.ust.students_service.service;

import com.ust.students_service.dto.Webinar;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class WebinarService {
    private final WebClient webClient;

    public WebinarService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:8086/api/webinars").build();
    }

    public Mono<Webinar> getWebinarById(String webinarId) {
        return webClient.get()
                .uri("/{id}", webinarId)
                .retrieve()
                .bodyToMono(Webinar.class);
    }
}
