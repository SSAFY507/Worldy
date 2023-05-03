package com.ssafy.worldy.model.game.dto;

import com.ssafy.worldy.model.game.entity.GameResult;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GameResultDto {

    UseInfoDto first; // 1등이 보유한 나라들
    UseInfoDto second; // 1등이 보유한 나라들
    UseInfoDto third; // 1등이 보유한 나라들
    UseInfoDto fourth; // 1등이 보유한 나라들

}
