package com.ssafy.worldy.model.game.dto;

import com.ssafy.worldy.model.game.entity.GameResult;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GameResultDto {
    List<Long> first; // 1등이 보유한 나라들
    List<Long> second; // 1등이 보유한 나라들
    List<Long> third; // 1등이 보유한 나라들
    List<Long> fourth; // 1등이 보유한 나라들

}
