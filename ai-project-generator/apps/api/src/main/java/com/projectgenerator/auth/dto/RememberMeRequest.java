package com.projectgenerator.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RememberMeRequest {

    @NotBlank(message = "Remember me token must not be blank")
    private String rememberMeToken;

    private String deviceId;

    private String browserFingerprint;
}
