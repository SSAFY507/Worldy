package com.ssafy.worldy.model.adventure.entity;

import com.ssafy.worldy.model.adventure.dto.WeatherDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "weather")
public class Weather {
    @Id
    @Column(name = "weather_id", nullable = false)
    private Long weatherId;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    @Column(name = "weather_name", nullable = false)
    private String weatherName;

    @Column(name = "temp", nullable = false)
    private float temp;

    public WeatherDto toDto(){
        return WeatherDto.builder()
                .weatherId(this.weatherId)
                .weatherName(this.weatherName)
                .temp(this.temp)
                .build();
    }
}
