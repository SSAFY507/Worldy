package com.ssafy.worldy.model.adventure.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InfoDto {

    private Long infoId;

    private String nationName;

    private String category;

    private String content;

    private String img;
}
