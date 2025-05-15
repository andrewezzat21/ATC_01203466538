package com.andrew.event_booking_backend.controller;

import com.andrew.event_booking_backend.dto.ApiResponse;
import com.andrew.event_booking_backend.dto.TicketRequestDTO;
import com.andrew.event_booking_backend.entity.Event;
import com.andrew.event_booking_backend.entity.Ticket;
import com.andrew.event_booking_backend.entity.User;
import com.andrew.event_booking_backend.service.TicketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tickets")
@RequiredArgsConstructor
@CrossOrigin
public class TicketController {

    private final TicketService ticketService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<Event>>> getEventsOfUser(@PathVariable Integer userId) {
        List<Event> events = ticketService.getEventsOfUser(userId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("All booked events for user with id: " + userId,
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        events));

    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<ApiResponse<List<Integer>>> getUsersOfEvent(@PathVariable Integer eventId) {
        List<Integer> users = ticketService.getUsersOfEvent(eventId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("All users for event with id: " + eventId,
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        users));

    }


    @PostMapping()
    public ResponseEntity<ApiResponse<Ticket>> createTicket(@Valid @RequestBody TicketRequestDTO ticketRequestDTO){

        Ticket ticket = ticketService.createEvent(ticketRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Ticket created with id: " + ticket.getId(),
                        HttpStatus.CREATED.value(),
                        LocalDateTime.now(),
                        ticket));

    }

    @DeleteMapping("/{userId}/event/{eventId}")
    public ResponseEntity<ApiResponse<Ticket>> deleteTicketByUserId(
            @PathVariable Integer userId, @PathVariable Integer eventId ){

        ticketService.deleteTicketByUserId(userId,eventId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("Ticket deleted successfully",
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        null));

    }
}
