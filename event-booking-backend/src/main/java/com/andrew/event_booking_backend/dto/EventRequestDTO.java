package com.andrew.event_booking_backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record EventRequestDTO(

        @NotNull(message = "Category is required")
        Integer categoryId,

        @NotBlank(message = "Event name is required")
        @Size(max = 255, message = "Event name must be less than 255 characters")
        String name,

        @NotBlank(message = "Description is required")
        String description,

        @JsonFormat(pattern = "MM/dd/yyyy hh:mm a")
        @NotNull(message = "Event date is required")
        @Future(message = "Event date must be in the future")
        LocalDateTime date,

        @NotBlank(message = "Venue is required")
        String venue,

        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.0", inclusive = true, message = "Price must be at least 0.0")
        @Digits(integer = 8, fraction = 2, message = "Price format is invalid! e.g., 35.99")
        BigDecimal price,

        @NotNull(message = "Capacity is required")
        @Min(value = 1, message = "Capacity must be at least 1")
        Integer capacity,

        String image

) { }
