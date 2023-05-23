package com.ssafy.worldy.model.quiz.dto;

import com.ssafy.worldy.model.quiz.entity.MultiAnswer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class OpenAPIMultiAnswerDto {

    private String answer; // 객관식 보기

    private int num; // 객관식 보기 번호. 해당 번호과 QuizDto의 answer 같을 경우 정답

    // 생성자 (List 변환을 위함)
    public OpenAPIMultiAnswerDto(MultiAnswer multiAnswer) {
        this.answer = multiAnswer.getAnswer();
        this.num = multiAnswer.getNum();
    }
}