package com.ssafy.worldy.model.adventure.repo;

import com.ssafy.worldy.model.adventure.entity.Weather;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WeatherRepo extends JpaRepository<Weather, Long> {
    @Query(value = "select * from weather where nation_id = ?1", nativeQuery = true)
    Weather findAllWeatherByNationId(Long nationId);
}
