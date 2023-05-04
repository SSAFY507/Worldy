package com.ssafy.worldy.model.game.dto;

import com.ssafy.worldy.model.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class GameRankingDto {

    RankUserDto myRank; // 내 등수
    List<RankUserDto> rankTop10User; // TOP 10
}
