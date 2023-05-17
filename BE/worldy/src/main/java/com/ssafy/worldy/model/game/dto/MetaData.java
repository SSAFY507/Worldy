package com.ssafy.worldy.model.game.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class MetaData {

    private String roomId;
    private String type = "metaData";
    private int currentLocation;
    private int dice1;
    private int dice2;
    private int dice;
    private int turn;
    private boolean isDouble;
    private String itemMsg1;
    private String itemMsg2;
    private int fund;
}
