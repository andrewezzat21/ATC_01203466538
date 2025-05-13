package com.andrew.event_booking_backend.controller;

import com.andrew.event_booking_backend.dto.ApiResponse;
import com.andrew.event_booking_backend.dto.EventDetailsResponse;
import com.andrew.event_booking_backend.dto.EventRequestDTO;
import com.andrew.event_booking_backend.entity.Event;
import com.andrew.event_booking_backend.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
@CrossOrigin
public class EventController {

    private final EventService eventService;

    // TODO : Event Crud Operations

    @GetMapping()
    public ResponseEntity<ApiResponse<List<Event>>> getAllEvents(){
        List<Event> events = eventService.getAllEvents();

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("All events: ",
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        events));

    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Event>> getEventById(@PathVariable Integer id){
        Event event = eventService.getEventById(id);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("Event details with id: " + id,
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        event));

    }

    @GetMapping("/{id}/details")
    public ResponseEntity<ApiResponse<EventDetailsResponse>> getEventDetailsById(@PathVariable Integer id){
        EventDetailsResponse eventDetails = eventService.getEventDetailsById(id);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("Event details with id: " + id,
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        eventDetails));

    }

    @PostMapping()
    public ResponseEntity<ApiResponse<Event>> createEvent(@Valid @RequestBody EventRequestDTO eventRequestDTO){
        Event event = eventService.createEvent(eventRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Event created with id: " + event.getId(),
                        HttpStatus.CREATED.value(),
                        LocalDateTime.now(),
                        event));

    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Event>> updateEvent(
            @PathVariable Integer id,
            @Valid @RequestBody EventRequestDTO eventRequestDTO
    ){
        Event event = eventService.updateEvent(id, eventRequestDTO);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("Event details updated with id: " + event.getId(),
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        event));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Event>> deleteEventById(@PathVariable Integer id){
        eventService.deleteEventById(id);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("Event with id: " + id + " deleted successfully",
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        null));

    }
}
