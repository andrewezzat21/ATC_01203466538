package com.andrew.event_booking_backend.controller;

import com.andrew.event_booking_backend.dto.ApiResponse;
import com.andrew.event_booking_backend.dto.UserLoginDTO;
import com.andrew.event_booking_backend.dto.UserRequestDTO;
import com.andrew.event_booking_backend.entity.User;
import com.andrew.event_booking_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@Valid @RequestBody UserRequestDTO userRequestDTO){
        User user = userService.register(userRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>("User created with id: " + user.getId(),
                        HttpStatus.CREATED.value(),
                        LocalDateTime.now(),
                        user));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@Valid @RequestBody UserLoginDTO userLoginDTO){

        String token = userService.login(userLoginDTO);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("Login Successful! ",
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        token));

    }


}
