package com.ssafy.worldy.model.quiz.dto;

import com.ssafy.worldy.model.adventure.dto.NationDto;
import com.ssafy.worldy.model.quiz.entity.QuizLike;
import com.ssafy.worldy.model.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class QuizLikeDto {

    private Long quizLikeId; // 아이디 (auto_increment)

    private QuizDto quizDto;

    private UserDto userDto;

    private QuizRecordDto quizRecordDto;

    private NationDto nationDto;

    // 생성자 (List 변환을 위함)
    public QuizLikeDto(QuizLike quizLike) {
        this.quizLikeId = quizLike.getQuizLikeId();
        this.quizDto = quizLike.getQuiz().toDto();
        this.userDto = quizLike.getUser().toDto();
        this.quizRecordDto = quizLike.getQuizRecord().toDto();
        this.nationDto = quizLike.getNation().toDto();
    }
}
