package com.ssafy.worldy.model.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class GameRankingDto {

    MyRankDto myRank; // 내 등수
    List<TopRankDto> rankTop10User; // TOP 10
}
