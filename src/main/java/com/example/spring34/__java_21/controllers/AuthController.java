package com.example.spring34.__java_21.controllers;

import com.example.spring34.__java_21.domain.user.User;
import com.example.spring34.__java_21.dto.LoginRequestDTO;
import com.example.spring34.__java_21.dto.RegisterRequestDTO;
import com.example.spring34.__java_21.dto.ResponseDTO;
import com.example.spring34.__java_21.infra.security.TokenService;
import com.example.spring34.__java_21.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    // Injects UserRepository, PasswordEncoder, and TokenService via constructor injection.
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    /**
     * Endpoint for user login.
     * Expects a JSON body with email and password.
     * If the credentials are valid, returns a JWT token along with the user's name.
     */
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body){
        // Look up the user by email.
        User user = this.repository.findByEmail(body.email())
                .orElseThrow(() ->  new RuntimeException("User not found"));

        // Check if the provided password matches the stored hashed password.
        if(passwordEncoder.matches(body.password(), user.getPassword())) {
            // Generate a JWT token with the "USER" role.
            String token = this.tokenService.generateTokenWithRole(user, "USER");
            return ResponseEntity.ok(new ResponseDTO(user.getName(), token));
        }
        // Return 400 Bad Request if authentication fails.
        return ResponseEntity.badRequest().build();
    }

    /**
     * Endpoint for user registration.
     * Expects a JSON body with name, email, and password.
     * Creates a new user if the email is not already registered, and returns a JWT token.
     */
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body){
        // Check if a user with the same email already exists.
        Optional<User> user = this.repository.findByEmail(body.email());

        if(user.isEmpty()) {
            // Create and save the new user with encoded password.
            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.password()));
            newUser.setEmail(body.email());
            newUser.setName(body.name());
            this.repository.save(newUser);

            // Generate a JWT token with the "USER" role for the new user.
            String token = this.tokenService.generateTokenWithRole(newUser, "USER");
            return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token));
        }
        // Return 400 Bad Request if email is already registered.
        return ResponseEntity.badRequest().build();
    }
}
