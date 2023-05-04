package com.ssafy.worldy.model.game.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.ToString;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@ToString
public class Item {
    private int itemId;
    private boolean instance;
    private String name;
    private String contents;
}
