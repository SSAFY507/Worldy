package com.ssafy.worldy.model.game.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Map {

    private int location;
    private String name;
    private Price price;
    private String type;
    private String landmark;
    private String contents;
    private String continent;
    private int owner;
    private int option;
    private int toll;
    private Build build;
}
