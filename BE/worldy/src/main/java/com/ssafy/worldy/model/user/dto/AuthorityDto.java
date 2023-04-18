package com.ssafy.worldy.model.user.dto;

import com.ssafy.worldy.model.user.entity.Authority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class AuthorityDto {

    private String authorityName;

    // DTO -> Entity 변환
    public Authority toEntity() {
        return Authority.builder()
                .authorityName(this.authorityName).build();
    }
}
