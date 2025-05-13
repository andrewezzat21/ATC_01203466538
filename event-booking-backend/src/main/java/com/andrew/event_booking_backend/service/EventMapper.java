package com.andrew.event_booking_backend.service;

import com.andrew.event_booking_backend.dto.EventRequestDTO;
import com.andrew.event_booking_backend.entity.Category;
import com.andrew.event_booking_backend.entity.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventMapper {

    private final CategoryService categoryService;

    public Event mapToEvent(EventRequestDTO eventRequestDTO) {
        String defaultImage = "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
        Category category = categoryService.getCategoryById(eventRequestDTO.categoryId());
        return Event.builder()
                .category(category)
                .name(eventRequestDTO.name())
                .description(eventRequestDTO.description())
                .date(eventRequestDTO.date())
                .venue(eventRequestDTO.venue())
                .price(eventRequestDTO.price())
                .image(!eventRequestDTO.image().isEmpty() ? eventRequestDTO.image() : defaultImage)
                .capacity(eventRequestDTO.capacity())
                .build();
    }
}

