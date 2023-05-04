package com.ssafy.worldy.model.quiz.repo;

import com.ssafy.worldy.model.quiz.entity.QuizRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuizRecordRepo extends JpaRepository<QuizRecord, Long> {

    @Query(value = "select * from quiz_record where user_id = ?1 and quiz_id = ?2", nativeQuery = true)
    QuizRecord findByUserIdAndQuizId(Long userId, Long quizId);
}
