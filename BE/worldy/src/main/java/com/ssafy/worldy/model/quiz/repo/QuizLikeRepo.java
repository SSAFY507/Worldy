package com.ssafy.worldy.model.quiz.repo;

import com.ssafy.worldy.model.quiz.entity.QuizLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizLikeRepo extends JpaRepository<QuizLike, Long> {

    // user_id로 스크랩한 퀴즈 찾기
    @Query(value = "select * from quiz_like where user_id = ?1", nativeQuery = true)
    List<QuizLike> findByUserId(Long userId);
}
