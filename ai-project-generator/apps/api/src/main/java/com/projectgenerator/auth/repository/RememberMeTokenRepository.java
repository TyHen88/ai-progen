package com.projectgenerator.auth.repository;

import com.projectgenerator.auth.entity.RememberMeTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RememberMeTokenRepository extends JpaRepository<RememberMeTokenEntity, String> {

    Optional<RememberMeTokenEntity> findByTokenHash(String tokenHash);

    List<RememberMeTokenEntity> findByUserIdAndIsRevokedFalse(String userId);

    @Modifying
    @Query("UPDATE RememberMeTokenEntity t SET t.isRevoked = true WHERE t.familyId = :familyId")
    int revokeFamily(@Param("familyId") String familyId);

    @Modifying
    @Query("UPDATE RememberMeTokenEntity t SET t.isRevoked = true WHERE t.userId = :userId")
    int revokeAllForUser(@Param("userId") String userId);
}
