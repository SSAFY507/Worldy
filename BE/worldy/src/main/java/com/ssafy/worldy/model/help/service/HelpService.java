package com.ssafy.worldy.model.help.service;

import com.ssafy.worldy.model.help.dto.HelpCreateDto;
import com.ssafy.worldy.model.help.dto.HelpDto;
import com.ssafy.worldy.model.help.repo.HelpRepo;
import com.ssafy.worldy.model.user.dto.UserDto;
import com.ssafy.worldy.model.user.service.KakaoUserService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.Collections;

@Service
public class HelpService {

    @Autowired
    KakaoUserService kakaoUserService;

    @Autowired
    HelpRepo helpRepo;

    // 문의 글 작성
    @Transactional
    public void createHelp(HelpCreateDto helpCreateDto, String kakaoId) {

        UserDto userDto = kakaoUserService.getUserDto(kakaoId);
        HelpDto helpDto = new HelpDto(helpCreateDto, userDto);

        helpRepo.save(helpDto.toEntity());
        inputElasticSearch(helpDto.getContent(), helpDto.getCategory(), userDto.getUserId());
    }

    // 작성한 내용을 ElasticSearch DB 의 help index 에 document 로 저장
    public void inputElasticSearch(String content, String category, Long userId) {

        Long helpId = helpRepo.findLatestPK(userId);
        // String url = "http://localhost:9200/help/_doc/" + helpId;
        String url = "https://k8a507.p.ssafy.io/es/help/_doc" + helpId;

        RestTemplate restTemplate = new RestTemplate();

        // create headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        // create param
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("help_id", helpId);
        jsonObject.put("content", content);
        jsonObject.put("category", category);

        HttpEntity<String> entity = new HttpEntity<>(jsonObject.toString(), headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, entity, String.class);

        System.out.println(response.getBody());
        System.out.println(response.getStatusCodeValue());
    }
}
