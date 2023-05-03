package com.ssafy.worldy.model.adventure.service;

import com.ssafy.worldy.model.adventure.dto.NewsDto;
import com.ssafy.worldy.model.adventure.dto.WeatherDto;
import com.ssafy.worldy.model.adventure.entity.News;
import com.ssafy.worldy.model.adventure.entity.Weather;
import com.ssafy.worldy.model.adventure.repo.NewsRepo;
import com.ssafy.worldy.model.adventure.repo.WeatherRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdventureService {
    private final NewsRepo newsRepo;
    private final WeatherRepo weatherRepo;

    public List<NewsDto> getNewsDtoList(Long nationId){
        List<NewsDto> newsDtoList = new ArrayList<>();
        List<News> newsList = newsRepo.findAllNewsByNationId(nationId);

        for(News n : newsList){
            newsDtoList.add(n.toDto());
        }

        return newsDtoList;
    }

    public WeatherDto getWeatherDto(Long nationId){
        Weather weather = weatherRepo.findAllWeatherByNationId(nationId);
        return weather.toDto();
    }

}
