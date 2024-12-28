package com.educhat.backend.services;

import com.educhat.backend.DTO.EventDTO;
import com.educhat.backend.models.Event;
import com.educhat.backend.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    public Event createEvent(EventDTO eventDTO) {

        var event = Event.builder().title(eventDTO.getTitle())
                .description(eventDTO.getDescription())
                .facultyUserId(eventDTO.getFacultyUserId())
                .facultyId(eventDTO.getFacultyId())
                .latitude(eventDTO.getLatitude())
                .longitude(eventDTO.getLongitude())
                .build();

        return eventRepository.save(event);}
}
