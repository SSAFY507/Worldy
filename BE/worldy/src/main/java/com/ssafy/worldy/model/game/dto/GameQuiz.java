package com.ssafy.worldy.model.game.dto;

import com.ssafy.worldy.model.quiz.dto.QuizDto;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@Builder
public class GameQuiz {

    private String type;
    private String kakaoId; // 퀴즈 맞추는 사람

    private String roomId;
    private QuizDto quizDto;
}
