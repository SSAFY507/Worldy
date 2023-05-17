package com.ssafy.worldy.model.adventure.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DynamicInfoDto {

    private String nationName;

    private String exchangeRate;

    private List<NewsDto> newsDtoList;

    private String weatherName;

    private float temp;

    private int time;
}
