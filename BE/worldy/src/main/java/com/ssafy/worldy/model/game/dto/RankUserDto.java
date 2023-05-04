package com.ssafy.worldy.model.game.dto;

import com.ssafy.worldy.model.user.dto.UserDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RankUserDto {

    int rank; // 등수
    UserDto user;
}
