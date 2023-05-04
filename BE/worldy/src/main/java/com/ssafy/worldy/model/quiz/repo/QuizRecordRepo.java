package com.ssafy.worldy.model.quiz.repo;

import com.ssafy.worldy.model.quiz.entity.QuizRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuizRecordRepo extends JpaRepository<QuizRecord, Long> {

    // quizId로 조회
    @Query(value = "select * from quiz_record where quiz_id = ?1 and user_id = ?2", nativeQuery = true)
    Optional<QuizRecord> findByQuizIdAndUserId(Long quizId, Long userId);
}
