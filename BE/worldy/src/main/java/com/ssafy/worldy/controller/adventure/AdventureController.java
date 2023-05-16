package com.ssafy.worldy.controller.adventure;

import com.ssafy.worldy.model.adventure.dto.*;
import com.ssafy.worldy.model.adventure.service.AdventureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/exchange/{nationId}")
    public ResponseEntity<ExchangeRateDto> getExchangeRate(@PathVariable Long nationId){
        return new ResponseEntity<>(adventureService.getExchangeRateDto(nationId), HttpStatus.OK);
    }

    @GetMapping("/info/dynamic/{nationId}")
    public ResponseEntity<DynamicInfoDto> getDynamicInfo(@PathVariable Long nationId){
        return new ResponseEntity<>(adventureService.getDynamicInfoDto(nationId), HttpStatus.OK);
    }

    @GetMapping("/info/static")
    public ResponseEntity<List<InfoDto>> getStaticInfo(@RequestParam Long nationId, @RequestParam String category){
        return new ResponseEntity<>(adventureService.getStaticInfoDto(nationId, category), HttpStatus.OK);
    }
}