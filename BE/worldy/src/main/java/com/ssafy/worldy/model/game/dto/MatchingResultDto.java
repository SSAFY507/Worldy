package com.ssafy.worldy.model.game.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@SuperBuilder
@NoArgsConstructor
public class MatchingResultDto {

    private MatchingRequestDto user1;
    private MatchingRequestDto user2;
    private MatchingRequestDto user3;
    private MatchingRequestDto user4;
    private GameRoom gameRoom;
}
