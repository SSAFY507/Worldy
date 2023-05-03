package com.ssafy.worldy.model.user.repo;

import com.ssafy.worldy.model.user.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    // kakaoId를 기준으로 user의 기본 정보 및 권한 정보를 가져오는 메소드
    // (EntityGraph는 Eager 조회로 authorities 정보를 같이 가져오게 함)
    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByKakaoId(String kakaoId);

    // kakaoIf로 회원 조회
    Optional<User> findByKakaoId(String kakaoId);
}
