package com.ssafy.worldy.model.adventure.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeRateDto {

    private String nationName;
    private String exchangeRate;
}
