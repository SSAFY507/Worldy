package com.ssafy.worldy.model.game.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Builder
@Setter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class EnterPlayerList {
    private String roomId;
    private String type;
    private int cnt;
    private EnterPlayer user1;
    private EnterPlayer user2;
    private EnterPlayer user3;
    private EnterPlayer user4;
}
