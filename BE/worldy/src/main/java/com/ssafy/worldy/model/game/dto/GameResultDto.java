package com.ssafy.worldy.model.game.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GameResultDto {
    List<Integer> first; // 1등이 보유한 나라들
    List<Integer> second; // 1등이 보유한 나라들
    List<Integer> third; // 1등이 보유한 나라들
    List<Integer> fourth; // 1등이 보유한 나라들
}
