package com.ssafy.worldy.model.game.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.ToString;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@ToString
public class Game {

    int location;
    int balance;
    int desert;
    boolean state;
    int dice1;
    int dice2;
    int dice;
    boolean isDouble;
    int[] own;
    int lap;
    int ranking;
}