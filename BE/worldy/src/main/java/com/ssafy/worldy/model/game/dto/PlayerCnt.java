package com.ssafy.worldy.model.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Builder
public class PlayerCnt {

    private String type;
    private String roomId;
    private int cnt;
}
