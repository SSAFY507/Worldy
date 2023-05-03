package com.ssafy.worldy.model.quiz.dto;

import lombok.Builder;

@Builder
public class MultiAnswerDto {

    private String answer; // 객관식 보기

    private String num; // 객관식 보기 번호. 해당 번호과 QuizDto의 answer 같을 경우 정답
}