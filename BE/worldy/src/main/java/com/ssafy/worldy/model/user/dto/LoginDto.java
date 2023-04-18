package com.ssafy.worldy.model.user.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {

    @NotNull
    private String kakaoId;

    @NotNull
    private String password;
}
