package com.ssafy.worldy.controller.adventure;

import com.ssafy.worldy.model.adventure.dto.NewsDto;
import com.ssafy.worldy.model.adventure.dto.WeatherDto;
import com.ssafy.worldy.model.adventure.service.AdventureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/adventure")
public class AdventureController {
    private final AdventureService adventureService;

    @GetMapping("/news/{nationId}")
    public ResponseEntity<List<NewsDto>> getNews(@PathVariable Long nationId){
        return new ResponseEntity<>(adventureService.getNewsDtoList(nationId), HttpStatus.OK);
    }

    @GetMapping("/weather/{nationId}")
    public ResponseEntity<WeatherDto> getWeather(@PathVariable Long nationId){
        return new ResponseEntity<>(adventureService.getWeatherDto(nationId), HttpStatus.OK);
    }
}
