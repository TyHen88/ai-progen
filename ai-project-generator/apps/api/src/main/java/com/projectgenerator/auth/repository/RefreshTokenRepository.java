package com.projectgenerator.auth.repository;

import com.projectgenerator.auth.entity.RefreshTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, String> {

    Optional<RefreshTokenEntity> findByTokenHash(String tokenHash);

    List<RefreshTokenEntity> findByUserIdAndIsRevokedFalse(String userId);

    @Modifying
    @Query("UPDATE RefreshTokenEntity t SET t.isRevoked = true WHERE t.familyId = :familyId")
    int revokeFamily(@Param("familyId") String familyId);

    @Modifying
    @Query("UPDATE RefreshTokenEntity t SET t.isRevoked = true WHERE t.userId = :userId")
    int revokeAllForUser(@Param("userId") String userId);
}
