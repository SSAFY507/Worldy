package com.ssafy.worldy.model.user.repo;

import com.ssafy.worldy.model.user.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    // kakaoId를 기준으로 user의 기본 정보 및 권한 정보를 가져오는 메소드
    // (EntityGraph는 Eager 조회로 authorities 정보를 같이 가져오게 함)
    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByKakaoId(String kakaoId);

    // kakaoId로 회원 조회
    Optional<User> findByKakaoId(String kakaoId);

    @Query(value = "select * from user order by mmr desc, level desc, exp desc limit 10",nativeQuery = true)
    List<User> findByRankTop10User();

    @Query(value = "select ranking from (select kakao_id, rank() over (order by  mmr desc, level desc, exp desc) as ranking from user) as a  where kakao_id = ?1",nativeQuery = true)
    int findByMyRank(String kakaoId);

    @Query(value = "select count(*) from user", nativeQuery = true)
    int userCnt();
}
