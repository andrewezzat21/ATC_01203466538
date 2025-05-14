package com.andrew.event_booking_backend.repository;

import com.andrew.event_booking_backend.entity.Category;
import com.andrew.event_booking_backend.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event,Integer> {
    List<Event> findByCategory(Category category);
}
