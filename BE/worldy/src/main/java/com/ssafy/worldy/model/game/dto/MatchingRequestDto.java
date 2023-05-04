package com.ssafy.worldy.model.game.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

/**
 * 직렬화 - 역직렬화 시에 serialVersionUID를 키로 객체의 호환을 따짐
 * producer에서 보내는 MatchingRequestDto의 객체가 맞는지 확인하기 위해 serialVersionUID가 필요함
 **/
@ToString
@Data
@SuperBuilder
@NoArgsConstructor
public class MatchingRequestDto implements Serializable {

    private static final long serialVersionUID = 6529685098267757690L;
    private String kakaoId;
    private String roomId;
    private String nickName;
    private String profileImg;
    private int mmr;
    private int level;
    private String startWaitingTime;
}
