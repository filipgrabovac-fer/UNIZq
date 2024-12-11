package com.educhat.backend.controllers;

import com.educhat.backend.DTO.EventDTO;
import com.educhat.backend.models.Event;
import com.educhat.backend.services.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin("*")
public class EventController {

    private final EventService eventService;
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @PostMapping("/create")
    public ResponseEntity<Event> createEvent(@RequestBody EventDTO event) {
        return ResponseEntity.ok(eventService.createEvent(event));
    }
}
