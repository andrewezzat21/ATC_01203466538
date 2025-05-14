package com.andrew.event_booking_backend.repository;

import com.andrew.event_booking_backend.entity.Event;
import com.andrew.event_booking_backend.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findByEventId(Integer eventId);
    boolean existsByUserIdAndEventId(Integer userId, Integer eventId);
    List<Ticket> findByUserId(Integer userId);
    void deleteByEvent(Event event);
}
