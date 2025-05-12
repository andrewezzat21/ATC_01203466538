package com.andrew.event_booking_backend.service;

import com.andrew.event_booking_backend.dto.EventRequestDTO;
import com.andrew.event_booking_backend.entity.Event;
import com.andrew.event_booking_backend.exception.EventNotFoundException;
import com.andrew.event_booking_backend.repository.EventRepository;
import com.andrew.event_booking_backend.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final TicketRepository ticketRepository;
    private final EventMapper eventMapper;


    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Integer id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found with id: " + id));
    }

    @Transactional
    public Event createEvent(EventRequestDTO eventRequestDTO) {
        Event event = eventMapper.mapToEvent(eventRequestDTO);
        return eventRepository.save(event);
    }

    @Transactional
    public Event updateEvent(Integer id, EventRequestDTO eventRequestDTO) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found with id: " + id));

        event.setCategoryId(eventRequestDTO.categoryId());
        event.setName(eventRequestDTO.name());
        event.setDescription(eventRequestDTO.description());
        event.setDate(eventRequestDTO.date());
        event.setVenue(eventRequestDTO.venue());
        event.setPrice(eventRequestDTO.price());
        event.setCapacity(eventRequestDTO.capacity());
        if(!eventRequestDTO.image().isEmpty()) event.setImage(eventRequestDTO.image());

        return eventRepository.save(event);
    }

    @Transactional
    public void deleteEventById(Integer id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found with id: " + id));

        ticketRepository.deleteByEventId(id);
        eventRepository.deleteById(id);
    }
}
