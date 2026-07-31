package com.projectgenerator.auth.controller;

import com.projectgenerator.auth.dto.AuthResponse;
import com.projectgenerator.auth.dto.LoginRequest;
import com.projectgenerator.auth.dto.RegisterRequest;
import com.projectgenerator.auth.service.AuthService;
import com.projectgenerator.common.response.ApiResponse;
import com.projectgenerator.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "User registration, login & JWT token endpoints")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "User Login", description = "Authenticate user with email and password to receive JWT token")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Login successful"));
    }

    @PostMapping("/register")
    @Operation(summary = "User Registration", description = "Register a new user account and return JWT token")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success(response, "User registered successfully"));
    }

    @GetMapping("/me")
    @Operation(summary = "Get Current User Profile", description = "Get authenticated user details from JWT token")
    public ResponseEntity<ApiResponse<AuthResponse>> getCurrentUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Unauthenticated user"));
        }
        AuthResponse response = AuthResponse.builder()
                .id(userPrincipal.getId())
                .email(userPrincipal.getEmail())
                .fullName(userPrincipal.getFullName())
                .role(userPrincipal.getAuthorities().iterator().next().getAuthority())
                .build();
        return ResponseEntity.ok(ApiResponse.success(response, "User profile retrieved successfully"));
    }
}
