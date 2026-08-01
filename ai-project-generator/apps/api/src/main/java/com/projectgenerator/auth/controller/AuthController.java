package com.projectgenerator.auth.controller;

import com.projectgenerator.auth.dto.AuthResponse;
import com.projectgenerator.auth.dto.LoginRequest;
import com.projectgenerator.auth.dto.RefreshTokenRequest;
import com.projectgenerator.auth.dto.RegisterRequest;
import com.projectgenerator.auth.dto.RememberMeRequest;
import com.projectgenerator.auth.dto.UserDeviceDto;
import com.projectgenerator.auth.service.AuthService;
import com.projectgenerator.common.response.ApiResponse;
import com.projectgenerator.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "User registration, login, remember-me persistent session, token rotation, and device management endpoints")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "User Login", description = "Authenticate user with email/password and issue Access Token + Refresh Token")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpServletRequest
    ) {
        String deviceInfo = extractDeviceInfo(httpServletRequest);
        String ipAddress = extractIpAddress(httpServletRequest);
        AuthResponse response = authService.login(request, deviceInfo, ipAddress);
        return ResponseEntity.ok(ApiResponse.success(response, "Login successful"));
    }

    @PostMapping("/remember-me")
    @Operation(summary = "Remember Me Persistent Login", description = "Authenticate with email/password and issue 30-day persistent Remember Me token with Device ID & Fingerprint validation")
    public ResponseEntity<ApiResponse<AuthResponse>> rememberMeLogin(
            @Valid @RequestBody LoginRequest request,
            @RequestHeader(value = "X-Device-ID", required = false) String deviceId,
            @RequestHeader(value = "X-Browser-Fingerprint", required = false) String browserFingerprint,
            HttpServletRequest httpServletRequest
    ) {
        String ipAddress = extractIpAddress(httpServletRequest);
        AuthResponse response = authService.rememberMeLogin(request, deviceId, browserFingerprint, ipAddress);
        return ResponseEntity.ok(ApiResponse.success(response, "Persistent login initialized successfully"));
    }

    @PostMapping("/remember-me/refresh")
    @Operation(summary = "Rotate Remember Me Token", description = "Exchange a valid Remember Me token for a new Access + Remember Me token pair with Redis L1 caching, fingerprint validation, and token family replay detection")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshRememberMeToken(
            @Valid @RequestBody RememberMeRequest request,
            @RequestHeader(value = "X-Device-ID", required = false) String deviceId,
            @RequestHeader(value = "X-Browser-Fingerprint", required = false) String browserFingerprint,
            HttpServletRequest httpServletRequest
    ) {
        String ipAddress = extractIpAddress(httpServletRequest);
        AuthResponse response = authService.refreshRememberMeToken(request, deviceId, browserFingerprint, ipAddress);
        return ResponseEntity.ok(ApiResponse.success(response, "Remember Me session extended successfully"));
    }

    @PostMapping("/register")
    @Operation(summary = "User Registration", description = "Register a new user account and issue Access Token + Refresh Token")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletRequest httpServletRequest
    ) {
        String deviceInfo = extractDeviceInfo(httpServletRequest);
        String ipAddress = extractIpAddress(httpServletRequest);
        AuthResponse response = authService.register(request, deviceInfo, ipAddress);
        return ResponseEntity.ok(ApiResponse.success(response, "User registered successfully"));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Rotate Refresh Token", description = "Exchange a valid Refresh Token for a new Access + Refresh Token pair with Replay Attack Detection")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request,
            HttpServletRequest httpServletRequest
    ) {
        String deviceInfo = extractDeviceInfo(httpServletRequest);
        String ipAddress = extractIpAddress(httpServletRequest);
        AuthResponse response = authService.refreshToken(request, deviceInfo, ipAddress);
        return ResponseEntity.ok(ApiResponse.success(response, "Token refreshed successfully"));
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout Device Session", description = "Revoke the specified refresh token / remember-me session")
    public ResponseEntity<ApiResponse<Void>> logout(@RequestBody(required = false) RefreshTokenRequest request) {
        if (request != null && request.getRefreshToken() != null) {
            authService.logout(request.getRefreshToken());
        }
        return ResponseEntity.ok(ApiResponse.success(null, "Logged out successfully"));
    }

    @PostMapping("/logout-all")
    @Operation(summary = "Logout Everywhere", description = "Revoke all active refresh token and remember-me session families across all devices for the authenticated user")
    public ResponseEntity<ApiResponse<Void>> logoutAll(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        if (userPrincipal != null) {
            authService.logoutAll(userPrincipal.getId());
        }
        return ResponseEntity.ok(ApiResponse.success(null, "All active device sessions revoked successfully"));
    }

    @GetMapping("/devices")
    @Operation(summary = "List Active User Devices", description = "List all active device sessions for the authenticated user")
    public ResponseEntity<ApiResponse<List<UserDeviceDto>>> getActiveDevices(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Unauthenticated user"));
        }
        List<UserDeviceDto> devices = authService.getActiveDevices(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(devices, "Active device sessions retrieved successfully"));
    }

    @GetMapping("/me")
    @Operation(summary = "Get Current User Profile", description = "Get authenticated user details from Access Token")
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

    private String extractDeviceInfo(HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        return userAgent != null ? userAgent : "Unknown Device";
    }

    private String extractIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
