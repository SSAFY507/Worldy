package com.ssafy.worldy.model.adventure.service;

import com.ssafy.worldy.model.adventure.dto.*;
import com.ssafy.worldy.model.adventure.entity.Info;
import com.ssafy.worldy.model.adventure.entity.Nation;
import com.ssafy.worldy.model.adventure.entity.News;
import com.ssafy.worldy.model.adventure.entity.Weather;
import com.ssafy.worldy.model.adventure.repo.InfoRepo;
import com.ssafy.worldy.model.adventure.repo.NationRepo;
import com.ssafy.worldy.model.adventure.repo.NewsRepo;
import com.ssafy.worldy.model.adventure.repo.WeatherRepo;
import com.ssafy.worldy.util.FastAPIUtil;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AdventureService {

    private final NewsRepo newsRepo;
    private final WeatherRepo weatherRepo;
    private final NationRepo nationRepo;
    private final InfoRepo infoRepo;
    @Value("${fastapi.exchange-rate.url}")
    private String requestUrl;

    public List<NewsDto> getNewsDtoList(Long nationId){

        List<NewsDto> newsDtoList = new ArrayList<>();
        List<News> newsList = newsRepo.findAllNewsByNationId(nationId);

        for(News n : newsList){
            if(n.getNewsImg() == null) continue;

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

    public DynamicInfoDto getDynamicInfoDto(Long nationId){

        List<NewsDto> newsDtoList = getNewsDtoList(nationId);
        WeatherDto weatherDto = getWeatherDto(nationId);
        ExchangeRateDto exchangeRateDto = getExchangeRateDto(nationId);

        // 세계 시간 구해오기
        // "중국" : 7, "일본" : 8, "인도" : 4, "영국" : 19, "프랑스" : 18, "이탈리아" : 14, "스페인" : 12, "미국" : 39, "이집트" : 27
        TimeZone timezone;
        Date date = new Date();
        DateFormat df = new SimpleDateFormat("HH mm");
        timezone = TimeZone.getTimeZone("Asia/Seoul");
        df.setTimeZone(timezone);
        String strTime = df.format(date);

        StringTokenizer st = new StringTokenizer(strTime, " ");
        int time = Integer.parseInt(st.nextToken());
        int min = Integer.parseInt(st.nextToken());

        if(nationId == 7){
            time -= 1;
            if(time < 0) time *= -1;
        }else if(nationId == 4){
            time -= 2;
            if(min < 30) time -= 1;
            if(time < 0) time *= -1;
        }else if(nationId == 19){
            time -= 8;
            if(time < 0) time *= -1;
        }else if(nationId == 18){
            time -= 7;
            if(time < 0) time *= -1;
        }else if(nationId == 14){
            time -= 7;
            if(time < 0) time *= -1;
        }else if(nationId == 12){
            time -= 7;
            if(time < 0) time *= -1;
        }else if(nationId == 39){
            time -= 13;
            if(time < 0) time *= -1;
        }else if(nationId == 27){
            time -= 6;
            if(time < 0) time *= -1;
        }

        return DynamicInfoDto.builder()
                .nationName(exchangeRateDto.getNationName())
                .exchangeRate(exchangeRateDto.getExchangeRate())
                .newsDtoList(newsDtoList)
                .weatherName(weatherDto.getWeatherName())
                .temp(weatherDto.getTemp())
                .time(time)
                .build();
    }

    public List<InfoDto> getStaticInfoDto(Long nationId, String category){

        List<Info> infoList = infoRepo.getInfoByNationIdAndCategory(nationId, category);
        List<InfoDto> infoDtoList = new ArrayList<>();

        for(Info i : infoList){
            infoDtoList.add(i.toDto());
        }

        return infoDtoList;
    }
}
