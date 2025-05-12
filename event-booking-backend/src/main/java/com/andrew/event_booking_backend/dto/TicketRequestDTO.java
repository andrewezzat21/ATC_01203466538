package com.andrew.event_booking_backend.dto;

import jakarta.validation.constraints.NotNull;

public record TicketRequestDTO(
        @NotNull(message = "User ID is required")
        Integer userId,

        @NotNull(message = "Event ID is required")
        Integer eventId
) {
}
