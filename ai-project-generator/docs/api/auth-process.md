# Authentication & Authorization Process

This document describes the security lifecycle, authentication flow, and token authorization mechanism implemented across the API and Frontend.

---

## 🔒 Authentication Flowchart

```text
[ Client (Web App) ]                           [ API (Spring Security) ]
         │                                                 │
         │─── 1. POST /api/v1/auth/login ─────────────────>│
         │    (email, password)                            │
         │                                                 │ verify BCrypt password
         │                                                 │ generate HMAC-SHA256 JWT
         │<── 2. Return AuthResponse ──────────────────────│
         │    (JWT Token, User Profile)                    │
         │                                                 │
         │─── 3. Request with Authorization Header ───────>│
         │    Bearer <JWT>                                 │
         │                                                 │ JwtAuthenticationFilter
         │                                                 │ validates token signature
         │                                                 │ sets SecurityContext
         │<── 4. Protected Resource Response ──────────────│
```

---

## 📌 Security Mechanisms

### 1. User Registration (`POST /api/v1/auth/register`)
- Accepts `fullName`, `email`, and `password`.
- Passwords are encrypted using **BCrypt** with strength factor 10.
- A new `UserEntity` is created in PostgreSQL with default role `ROLE_USER` and initial credit allocation.

### 2. Login & Token Issuance (`POST /api/v1/auth/login`)
- Verifies credentials against `users` table.
- Generates a signed **JWT Access Token** (valid for 24 hours) containing `email`, `role`, `issuedAt`, and `expiration`.

### 3. Stateless Request Interception
- `JwtAuthenticationFilter` intercepts every incoming HTTP request.
- Reads `Authorization: Bearer <token>` header.
- Uses `JwtTokenProvider` to parse signature and expiry.
- Populates `SecurityContextHolder` with `UserPrincipal` and `GrantedAuthorities`.

### 4. Role-Based Access Control (RBAC)
- Public routes: `/api/v1/health`, `/api/v1/auth/login`, `/api/v1/auth/register`, `/swagger-ui.html`.
- Protected user routes: `/api/v1/projects/**`, `/api/v1/generator/**`.
- Admin console routes: `/api/v1/admin/**` (requires `ROLE_ADMIN`).
