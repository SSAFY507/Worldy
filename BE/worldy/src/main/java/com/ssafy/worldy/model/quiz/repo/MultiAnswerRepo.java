package com.ssafy.worldy.model.quiz.repo;

import com.ssafy.worldy.model.quiz.entity.MultiAnswer;
import com.ssafy.worldy.model.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MultiAnswerRepo extends JpaRepository<MultiAnswer, Long> {

    List<MultiAnswer> findByQuiz(Quiz quiz);
}
