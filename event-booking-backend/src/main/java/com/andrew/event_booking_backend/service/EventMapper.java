package com.andrew.event_booking_backend.service;

import com.andrew.event_booking_backend.dto.EventRequestDTO;
import com.andrew.event_booking_backend.entity.Event;
import org.springframework.stereotype.Service;

@Service
public class EventMapper {

    public Event mapToEvent(EventRequestDTO eventRequestDTO) {
        String defaultImage = "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

        return Event.builder()
                .categoryId(eventRequestDTO.categoryId())
                .name(eventRequestDTO.name())
                .description(eventRequestDTO.description())
                .date(eventRequestDTO.date())
                .venue(eventRequestDTO.venue())
                .price(eventRequestDTO.price())
                .image(defaultImage)
                .build();
    }
}

