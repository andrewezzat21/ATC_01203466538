package com.andrew.event_booking_backend.service;

import com.andrew.event_booking_backend.dto.CategoryRequestDTO;
import com.andrew.event_booking_backend.dto.EventDetailsResponse;
import com.andrew.event_booking_backend.entity.Category;
import com.andrew.event_booking_backend.entity.Event;
import com.andrew.event_booking_backend.exception.CategoryNotFoundException;
import com.andrew.event_booking_backend.repository.CategoryRepository;
import com.andrew.event_booking_backend.repository.EventRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final EventRepository eventRepository;
    private final TicketService ticketService;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Integer id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + id));
    }

    @Transactional
    public Category createCategory(CategoryRequestDTO categoryRequestDTO) {

        if(categoryRepository.existsByName(categoryRequestDTO.name()))
            throw new RuntimeException("Category was the same name already found!");

        Category category = Category.builder()
                .name(categoryRequestDTO.name())
                .build();
        return categoryRepository.save(category);
    }

    @Transactional
    public Category updateCategory(Integer id, CategoryRequestDTO categoryRequestDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + id));

        category.setName(categoryRequestDTO.name());

        return categoryRepository.save(category);
    }

    @Transactional
    public void deleteCategoryById(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + id));

        if (!category.getEvents().isEmpty()) {
            throw new IllegalStateException("Cannot delete category with active events.");
        }

        categoryRepository.deleteById(id);
    }

    public List<EventDetailsResponse> getEventsByCategoryId(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + id));

        List<Event> events = eventRepository.findByCategory(category);

        return events.stream()
                .map(event -> {
                    List<Integer> users = ticketService.getUsersOfEvent(event.getId());
                    Integer ticketsLeft = event.getCapacity() - users.size();
                    return new EventDetailsResponse(
                            event,
                            users,
                            ticketsLeft
                    );
                })
                .toList();

    }
}
