package com.ssafy.worldy.model.game.dto;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
public class Player {

    private String type;
    private String pId;
    private int pNum;
    private String name;
    private Game game;
    private String roomId;
}
