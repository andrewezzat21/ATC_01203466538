package com.andrew.event_booking_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryRequestDTO(

        @NotBlank(message = "Category name is required")
        @Size(max = 255, message = "Category name must be less than 255 characters")
        String name

) {
}
