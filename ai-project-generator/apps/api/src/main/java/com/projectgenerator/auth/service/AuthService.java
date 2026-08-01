package com.projectgenerator.auth.service;

import com.projectgenerator.auth.dto.AuthResponse;
import com.projectgenerator.auth.dto.LoginRequest;
import com.projectgenerator.auth.dto.RefreshTokenRequest;
import com.projectgenerator.auth.dto.RegisterRequest;
import com.projectgenerator.auth.dto.RememberMeRequest;
import com.projectgenerator.auth.dto.UserDeviceDto;

import java.util.List;

public interface AuthService {

    AuthResponse login(LoginRequest request, String deviceInfo, String ipAddress);

    AuthResponse rememberMeLogin(LoginRequest request, String deviceId, String browserFingerprint, String ipAddress);

    AuthResponse register(RegisterRequest request, String deviceInfo, String ipAddress);

    AuthResponse refreshToken(RefreshTokenRequest request, String deviceInfo, String ipAddress);

    AuthResponse refreshRememberMeToken(RememberMeRequest request, String deviceId, String browserFingerprint, String ipAddress);

    void logout(String refreshToken);

    void logoutAll(String userId);

    List<UserDeviceDto> getActiveDevices(String userId);
}
