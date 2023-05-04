package com.ssafy.worldy.model.quiz.repo;

import com.ssafy.worldy.model.quiz.entity.MultiAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MultiAnswerRepo extends JpaRepository<MultiAnswer, Long> {

    // quiz_id로 4개의 선택지 조회
    @Query(value = "select * from multi_answer where quiz_id = ?1", nativeQuery = true)
    List<MultiAnswer> findByQuizId(Long quizId);
}
