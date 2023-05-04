package com.ssafy.worldy.model.user.dto;

import com.ssafy.worldy.model.quiz.dto.QuizLikeDto;
import com.ssafy.worldy.model.quiz.entity.QuizLike;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ScrapDto {

    private Long quizId; // 퀴즈 id

    private String nationName; // 국가명

    private int level; // 퀴즈 수준

    private String quizType; // 퀴즈 유형

    private String category; // 카테고리

    private String image; // 이미지

    private String content; // 문제

    private String answer; // 정답

    // 객관식 문항 (객관식 아닐 경우 null)
    private String multiFirst; // 첫 번째 문항
    private String multiSecond; // 두 번째 문항
    private String multiThird; // 세 번째 문항
    private String multiFourth; // 네 번째 문항

    private String hint; // 힌트

    private boolean hintType; // 힌트 유형

    private String commentary; // 해설

    private String userAnswer; // 유저가 적은 답변 (맞았으면 null)

    private boolean success; // 맞춘 문제인지 표현

    // 생성자 (List 변환을 위함)
    public ScrapDto(QuizLikeDto quizLikeDto) {
        this.quizId = quizLikeDto.getQuizDto().getQuizId();
        this.nationName = quizLikeDto.getNationDto().getNationName();
        this.level = quizLikeDto.getQuizDto().getLevel();
        this.quizType = quizLikeDto.getQuizDto().getQuizType();
        this.category = quizLikeDto.getQuizDto().getCategory();
        this.image = quizLikeDto.getQuizDto().getImage();
        this.content = quizLikeDto.getQuizDto().getContent();
        this.answer = quizLikeDto.getQuizDto().getAnswer();
        this.hint = quizLikeDto.getQuizDto().getHint();
        this.hintType = quizLikeDto.getQuizDto().isHintType();
        this.commentary = quizLikeDto.getQuizDto().getCommentary();
        this.userAnswer = quizLikeDto.getQuizRecordDto().getUserAnswer();

        this.multiFirst = null;
        this.multiSecond = null;
        this.multiThird = null;
        this.multiFourth = null;
    }
}
