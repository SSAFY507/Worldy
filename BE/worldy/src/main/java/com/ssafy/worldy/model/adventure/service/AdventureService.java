package com.ssafy.worldy.model.adventure.service;

import com.ssafy.worldy.model.adventure.dto.ExchangeRateDto;
import com.ssafy.worldy.model.adventure.dto.InfoDto;
import com.ssafy.worldy.model.adventure.dto.NewsDto;
import com.ssafy.worldy.model.adventure.dto.WeatherDto;
import com.ssafy.worldy.model.adventure.entity.Nation;
import com.ssafy.worldy.model.adventure.entity.News;
import com.ssafy.worldy.model.adventure.entity.Weather;
import com.ssafy.worldy.model.adventure.repo.NationRepo;
import com.ssafy.worldy.model.adventure.repo.NewsRepo;
import com.ssafy.worldy.model.adventure.repo.WeatherRepo;
import com.ssafy.worldy.util.FastAPIUtil;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdventureService {

    private final NewsRepo newsRepo;
    private final WeatherRepo weatherRepo;
    private final NationRepo nationRepo;
    @Value("${fastapi.exchange-rate.url}")
    private String requestUrl;

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

    public ExchangeRateDto getExchangeRateDto(Long nationId){
        Nation nation = nationRepo.findByNationId(nationId).get();
        String nationName = nation.getNationName();

        FastAPIUtil fastAPIUtil = new FastAPIUtil();

        JSONObject result = fastAPIUtil.getRequestFastAPI(requestUrl+nationName);

        String exchangeRate = result.get(nationName).toString();

        return ExchangeRateDto.builder()
                .nationName(nationName)
                .exchangeRate(exchangeRate)
                .build();
    }

    public InfoDto getInfoDto(Long nationId){
        List<NewsDto> newsDtoList = getNewsDtoList(nationId);
        WeatherDto weatherDto = getWeatherDto(nationId);
        ExchangeRateDto exchangeRateDto = getExchangeRateDto(nationId);

        return InfoDto.builder()
                .nationName(exchangeRateDto.getNationName())
                .exchangeRate(exchangeRateDto.getExchangeRate())
                .newsDtoList(newsDtoList)
                .weatherName(weatherDto.getWeatherName())
                .temp(weatherDto.getTemp())
                .build();
    }
}
