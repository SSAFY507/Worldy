package com.ssafy.worldy.model.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long userId; // 아이디 (auto_increment)

    private String password; // 비밀번호

    private String kakaoId; // 카카오 아이디

    private String profileImg; // 카카오 프로필 이미지

    private String sex; // 성별

    private String age; // 나이

    private boolean activated; // 활성화 여부

    private String refreshToken; // refresh 토큰

    private int tier; // mmr 기반 티어

    private int exp; // 경험치

    private int level; // 경험치 기반 레벨

    private int mmr; // Elo 기반 Matchmaking Rating
}
