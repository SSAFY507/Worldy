package com.ssafy.worldy.model.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class MultiAnswerDto {

    private Long multiAnswerId; // 아이디 (auto_increment)

    private QuizDto quizDto; // 퀴즈

    private String answer; // 객관식 보기

    private String num; // 객관식 보기 번호. 해당 번호과 QuizDto의 answer 같을 경우 정답
}