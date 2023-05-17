package com.ssafy.worldy.model.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class HiddenCatchDto {

    private String originalUrl; // 원본 그림

    private String diffUrl; // 틀린 그림

    private int imgNum; // 사진 번호

    private List<List<String>> answerPointList; // 정답 좌표

    private String imgTitle; // 이미지 이름

    private String imgSubTitle; // 이미지 영어 이름
    
    private String imgContent; // 이미지 정보
}
