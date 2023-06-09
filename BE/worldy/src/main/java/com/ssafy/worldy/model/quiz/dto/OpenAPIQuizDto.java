package com.ssafy.worldy.model.quiz.dto;

import com.ssafy.worldy.model.adventure.entity.Nation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class OpenAPIQuizDto {

    private String nation; // 출제자 - gpt, worldy, user

    private String quizType; // 퀴즈 타입 - 빈칸, 객관식, 주관식

    private String category; // 퀴즈 카테고리 - 시사/문화, 역사, 기타

    private int level; // 퀴즈 난이도

    private String image; // 퀴즈 이미지

    private String content; // 퀴즈 내용

    private String answer; // 정답

    private String hint; // 힌트

    private String commentary; // 해설

    private List<OpenAPIMultiAnswerDto> multiAnswerList; // 객관실 경우 객관식 보기 리스트
}
