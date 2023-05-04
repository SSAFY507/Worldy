package com.ssafy.worldy.model.quiz.dto;

import com.ssafy.worldy.model.adventure.entity.Nation;
import com.ssafy.worldy.model.quiz.entity.Quiz;
import com.ssafy.worldy.model.quiz.entity.QuizLike;
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
public class QuizLikeInsertDto {

    private Long quizId;

    private Long userId;

    private Long nationId;

    public QuizLike toEntity(Quiz quiz, User user, QuizRecord quizRecord, Nation nation){
        return QuizLike.builder()
                .quiz(quiz)
                .user(user)
                .quizRecord(quizRecord)
                .nation(nation)
                .build();
    }
}
