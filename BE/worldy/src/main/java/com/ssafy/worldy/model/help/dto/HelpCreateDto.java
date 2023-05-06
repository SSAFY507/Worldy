package com.ssafy.worldy.model.help.dto;

import com.ssafy.worldy.model.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class HelpCreateDto {

    private String category; // 문의 카테고리

    private String content; // 문의 내용
}
