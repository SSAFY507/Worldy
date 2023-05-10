package com.ssafy.worldy.model.game.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Price {
    private int land;
    private int villa;
    private int hotel;
    private int landmark;
}
