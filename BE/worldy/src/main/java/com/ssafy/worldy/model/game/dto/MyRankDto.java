package com.ssafy.worldy.model.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MyRankDto {

    int rank; // 등수
    private String nickName; // 닉네임
    private String profileImg;
    private String tier; // mmr 기반 티어
    private int level; // 경험치 기반 레벨
    private int percent; // 상위 퍼센트
}
