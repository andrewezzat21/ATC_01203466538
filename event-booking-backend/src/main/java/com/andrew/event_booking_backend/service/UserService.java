package com.andrew.event_booking_backend.service;

import com.andrew.event_booking_backend.dto.UserLoginDTO;
import com.andrew.event_booking_backend.dto.UserRequestDTO;
import com.andrew.event_booking_backend.entity.User;
import com.andrew.event_booking_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    @Transactional
    public User register(UserRequestDTO userRequestDTO) {

        if(userRepository.existsByEmail(userRequestDTO.email())){
            throw new RuntimeException("A user with the same email is registered!");
        }

        User user = User.builder()
                .email(userRequestDTO.email())
                .password(passwordEncoder.encode(userRequestDTO.password()))
                .firstName(userRequestDTO.firstName())
                .lastName(userRequestDTO.lastName())
                .build();

        return userRepository.save(user);
    }

    public String login(UserLoginDTO userLoginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userLoginDTO.email(), userLoginDTO.password())
        );
        if(!authentication.isAuthenticated())
            throw new RuntimeException("Invalid Credentials! Email and/or Password is wrong!");

        return jwtService.generateToken(userLoginDTO.email());
    }
}
