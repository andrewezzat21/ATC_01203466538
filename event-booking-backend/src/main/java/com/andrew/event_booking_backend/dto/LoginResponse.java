package com.andrew.event_booking_backend.dto;

import java.util.List;

public record LoginResponse(
        String firstName,
        String lastName,
        String token,
        List<String> roles
) {
}
