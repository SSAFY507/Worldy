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
public class QuizRecordDto {

    private Long quizRecordId; // 아이디 (auto_increment)

    private UserDto userDto; // 회원

    private QuizDto quizDto; // 퀴즈

    private boolean success; // 풀이 성공 여부

    private String userAnswer; // 회원이 입력(선택)한 답안
}
