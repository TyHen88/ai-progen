package com.projectgenerator.auth.service;

import com.projectgenerator.auth.dto.AuthResponse;
import com.projectgenerator.auth.dto.LoginRequest;
import com.projectgenerator.auth.dto.RegisterRequest;

public interface AuthService {

    AuthResponse login(LoginRequest request);

    AuthResponse register(RegisterRequest request);
}
