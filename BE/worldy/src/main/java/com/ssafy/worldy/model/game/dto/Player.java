package com.ssafy.worldy.model.game.dto;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
public class Player {
    private String kakaoId;
    private String roomId;
    private int location;
    private int cycle;
    private int balance;
    private List<Nation> nationList;
    private List<Item> items;
    private int dice;
    private boolean doubled;
}
