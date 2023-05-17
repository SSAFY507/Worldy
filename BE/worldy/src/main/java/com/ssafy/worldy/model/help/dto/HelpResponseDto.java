package com.ssafy.worldy.model.help.dto;

import com.ssafy.worldy.model.help.entity.Help;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class HelpResponseDto {

    private Long helpId; // 아이디 (auto_increment)

    private String category; // 문의 카테고리

    private String content; // 문의 내용

    private String answer; // 답변

    // 생성자 (List 변환을 위함)
    public HelpResponseDto(Help help) {
        this.helpId = help.getHelpId();
        this.category = help.getCategory();
        this.content = help.getContent();
        this.answer = help.getAnswer();
    }
}
