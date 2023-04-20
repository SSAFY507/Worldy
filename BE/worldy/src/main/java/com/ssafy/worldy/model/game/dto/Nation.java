package com.ssafy.worldy.model.game.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.ToString;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@ToString
public class Nation {
    private int location;
    private String type;
    private boolean villa;
    private boolean hotel;
    private boolean landmark;
    private String contents;
}
