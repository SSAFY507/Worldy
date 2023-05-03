package com.ssafy.worldy.model.game.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UseInfoDto {

    String kakaoId;
    List<Long> nationList; // 1등이 보유한 나라들
}
