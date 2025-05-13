package com.andrew.event_booking_backend.dto;

import com.andrew.event_booking_backend.entity.Event;
import com.andrew.event_booking_backend.entity.User;

import java.util.List;

public record EventDetailsResponse(
        Event event,
        List<Integer> users,
        Integer ticketsLeft
) {
}
