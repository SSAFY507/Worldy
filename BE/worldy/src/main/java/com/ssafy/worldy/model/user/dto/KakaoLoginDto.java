package com.ssafy.worldy.model.user.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KakaoLoginDto {

    TokenDto tokenDto;

    private String kakaoId;

    private String profileImg;
}
