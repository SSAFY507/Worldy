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
public class EnterPlayer {

    private String kakaoId;
    private String nickName;
    private String profileImg;
    private int mmr;
    private int level;
    private String tier;
}
