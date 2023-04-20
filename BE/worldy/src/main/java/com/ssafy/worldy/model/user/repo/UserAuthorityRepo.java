package com.ssafy.worldy.model.user.repo;

import com.ssafy.worldy.model.user.entity.UserAuthority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAuthorityRepo extends JpaRepository<UserAuthority, Long> {

    // 권한명(authority_name)으로 조회
    @Query(value = "select * from user_authority where authority_name = ?1", nativeQuery = true)
    Optional<UserAuthority> findByAuthorityName(String authorityName);
}
