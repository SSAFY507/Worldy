package com.ssafy.worldy.model.help.dto;

import com.ssafy.worldy.model.help.entity.Help;
import com.ssafy.worldy.model.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class HelpDto {

    private Long helpId; // 아이디 (auto_increment)

    private UserDto userDto; // 회원

    private String category; // 문의 카테고리

    private String content; // 문의 내용

    private String answer; // 답변

    // HelpCreatedDto -> HelpDto 변환을 위함
    public HelpDto(HelpCreateDto helpCreateDto, UserDto userDto) {
        this.userDto = userDto;
        this.category = helpCreateDto.getCategory();
        this.content = helpCreateDto.getContent();
    }

    // DTO -> Entity 변환을 위함
    public Help toEntity() {
        return Help.builder()
                .user(this.userDto.toEntity())
                .category(this.category)
                .content(this.content).build();
    }
}
