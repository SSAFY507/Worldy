package com.ssafy.worldy.model.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class TokenDto {

    private String accessToken; // access 토큰

    private String refreshToken; // refresh 토큰
}
