package com.ssafy.worldy.matching.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@ToString
@Getter
@SuperBuilder
@NoArgsConstructor
public class MatchingResultDto {

    private MatchingRequestDto user1;
    private MatchingRequestDto user2;
    private MatchingRequestDto user3;
    private MatchingRequestDto user4;
}
