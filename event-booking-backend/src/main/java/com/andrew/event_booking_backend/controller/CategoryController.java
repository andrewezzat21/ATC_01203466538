package com.andrew.event_booking_backend.controller;

import com.andrew.event_booking_backend.dto.ApiResponse;
import com.andrew.event_booking_backend.dto.CategoryRequestDTO;
import com.andrew.event_booking_backend.dto.EventDetailsResponse;
import com.andrew.event_booking_backend.entity.Category;
import com.andrew.event_booking_backend.entity.Event;
import com.andrew.event_booking_backend.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/categories")
@CrossOrigin
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<Category>>> getAllCategories(){
        List<Category> categories = categoryService.getAllCategories();

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("All categories: ",
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        categories));

    }


    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Category>> getCategoryById(@PathVariable Integer id) {
        Category category = categoryService.getCategoryById(id);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("Category details with id: " + id,
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        category));
    }

    @GetMapping("/{id}/events")
    public ResponseEntity<ApiResponse<List<EventDetailsResponse>>> getEventsByCategoryId(@PathVariable Integer id) {
        List<EventDetailsResponse> events = categoryService.getEventsByCategoryId(id);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("Category events with id: " + id,
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        events));
    }

    @PostMapping()
    public ResponseEntity<ApiResponse<Category>> createCategory(@Valid @RequestBody CategoryRequestDTO categoryRequestDTO) {
        Category category = categoryService.createCategory(categoryRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Category created with id: " + category.getId(),
                        HttpStatus.CREATED.value(),
                        LocalDateTime.now(),
                        category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Category>> updateCategory(
            @PathVariable Integer id,
            @RequestBody CategoryRequestDTO categoryRequestDTO
    ) {
        Category category = categoryService.updateCategory(id, categoryRequestDTO);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("Category details updated with id: " + category.getId(),
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Category>> deleteCategoryById(@PathVariable Integer id) {
        categoryService.deleteCategoryById(id);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("Category with id: " + id + " deleted successfully",
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        null));
    }


}
