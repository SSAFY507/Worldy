package com.ssafy.worldy.model.adventure.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class NewsDto {
    private Long newsId;

    private String nationName;

    private String newsTitle;

    private String newsSummary;

    private String newsImg;

    private String newsUrl;
}
