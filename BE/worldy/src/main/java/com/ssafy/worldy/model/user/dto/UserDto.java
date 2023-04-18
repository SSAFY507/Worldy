package com.ssafy.worldy.model.user.dto;

import com.ssafy.worldy.model.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long userId;

    private String kakaoId;

    private String password;

    private boolean activated;

    // DTO -> Entity 변환
    public User toEntity() {
        return User.builder()
                .userId(this.userId)
                .kakaoId(this.kakaoId)
                .password(this.password)
                .activated(this.activated).build();
    }
}
