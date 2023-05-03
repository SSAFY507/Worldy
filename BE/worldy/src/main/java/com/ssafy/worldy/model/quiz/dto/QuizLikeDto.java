package com.ssafy.worldy.model.quiz.dto;

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
}
