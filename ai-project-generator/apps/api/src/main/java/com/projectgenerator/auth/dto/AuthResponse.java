package com.projectgenerator.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String token;          // Legacy token field for backward compatibility
    private String accessToken;    // Short-lived Access Token (15 mins)
    private String refreshToken;   // Long-lived Refresh Token (30 days)
    @Builder.Default
    private String tokenType = "Bearer";
    @Builder.Default
    private Long expiresIn = 900L; // Access Token TTL in seconds (15 mins)

    private String id;
    private String email;
    private String fullName;
    private String role;
    private Integer credits;
}
