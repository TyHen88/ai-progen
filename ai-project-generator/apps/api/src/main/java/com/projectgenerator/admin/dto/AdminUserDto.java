package com.projectgenerator.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

/** Deliberately excludes passwordHash — never expose it, even to admins. */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserDto {

    private String id;
    private String email;
    private String fullName;
    private String role;
    private Integer credits;
    private Instant createdAt;
}
