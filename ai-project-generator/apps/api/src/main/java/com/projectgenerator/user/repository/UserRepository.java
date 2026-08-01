package com.projectgenerator.user.repository;

import com.projectgenerator.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {

    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);

    @Modifying
    @Query("UPDATE UserEntity u SET u.credits = u.credits - :amount WHERE u.id = :userId AND u.credits >= :amount")
    int deductCredits(@Param("userId") String userId, @Param("amount") int amount);
}
