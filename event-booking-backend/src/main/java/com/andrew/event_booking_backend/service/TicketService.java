package com.andrew.event_booking_backend.service;

import com.andrew.event_booking_backend.dto.TicketRequestDTO;
import com.andrew.event_booking_backend.entity.Event;
import com.andrew.event_booking_backend.entity.Ticket;
import com.andrew.event_booking_backend.entity.User;
import com.andrew.event_booking_backend.repository.EventRepository;
import com.andrew.event_booking_backend.repository.TicketRepository;
import com.andrew.event_booking_backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    @Transactional
    public Ticket createEvent(TicketRequestDTO ticketRequestDTO) {
        User user = userRepository.findById(ticketRequestDTO.userId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Event event = eventRepository.findById(ticketRequestDTO.eventId())
                .orElseThrow(() -> new EntityNotFoundException("Event not found"));

        boolean alreadyBooked = ticketRepository.existsByUserIdAndEventId(user.getId(), event.getId());
        if (alreadyBooked) {
            throw new IllegalStateException("User has already booked this event");
        }

        int totalBooked = ticketRepository.findByEventId(event.getId()).size();

        if(totalBooked + 1 > event.getCapacity()){
            throw new IllegalStateException("Not enough tickets available");
        }

        Ticket ticket = Ticket.builder()
                .user(user)
                .event(event)
                .build();

        return ticketRepository.save(ticket);
    }

    public List<Event> getEventsOfUser(Integer userId) {

        List<Ticket> tickets =  ticketRepository.findByUserId(userId);
        return tickets.stream()
                .map(Ticket::getEvent)
                .toList();
    }

    public List<Integer> getUsersOfEvent(Integer eventId) {
        List<Ticket> tickets = ticketRepository.findByEventId(eventId);
        return tickets.stream()
                .map(ticket -> ticket.getUser().getId())
                .toList();
    }
}
