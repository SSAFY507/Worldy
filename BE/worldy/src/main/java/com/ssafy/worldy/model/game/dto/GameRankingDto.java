package com.ssafy.worldy.model.game.dto;

import com.ssafy.worldy.model.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GameRankingDto {

    List<User> users; // 내 등수를 포함한 TOP 10
}
