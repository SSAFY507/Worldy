package com.ssafy.worldy.model.adventure.dto;

import com.ssafy.worldy.model.adventure.entity.Nation;
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
    
}
