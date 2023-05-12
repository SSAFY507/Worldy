package com.ssafy.worldy.model.help.repo;

import com.ssafy.worldy.model.help.entity.Help;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HelpRepo extends JpaRepository<Help, Long> {

    // 내가 쓴 글 중 가장 최근에 저장된 row PK 조회
    @Query(value = "select help_id from help where user_id = ?1 order by help_id desc limit 1", nativeQuery = true)
    Long findLatestPK(Long userId);

    // 모든 글 조회
    List<Help> findAll();
}
