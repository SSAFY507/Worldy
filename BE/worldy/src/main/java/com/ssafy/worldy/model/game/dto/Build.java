package com.ssafy.worldy.model.game.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Build {

    private boolean land;
    private boolean villa;
    private boolean hotel;
    private boolean landmark;
}
