package com.ssafy.worldy.model.quiz.dto;

import com.ssafy.worldy.model.quiz.entity.Quiz;
import com.ssafy.worldy.model.quiz.entity.QuizRecord;
import com.ssafy.worldy.model.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class QuizRecordInsertDto {

    private Long userId;
    private Long quizId;
    private boolean success;
    private String userAnswer;

    public QuizRecord toEntity(User user, Quiz quiz){
        return QuizRecord.builder()
                .user(user)
                .quiz(quiz)
                .success(this.success)
                .userAnswer(this.userAnswer)
                .build();
    }
}
