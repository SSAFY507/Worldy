package com.ssafy.worldy.model.user.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KakaoLoginDto {

    TokenDto tokenDto; // access, refresh 토큰

    private String kakaoId; // 카카오 아이디

    private String profileImg; // 프로필 이미지

    private String nickName; // 닉네임
}
