package com.ssafy.worldy.matching.model.service;

import com.ssafy.worldy.matching.model.dto.MatchingRequestDto;
import com.ssafy.worldy.matching.model.dto.MatchingResultDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Component
public class GameMatchingSend {
    private final SimpMessageSendingOperations template;

    // final String url = "https://k8a507.p.ssafy.io/api/game/matching/result";
    final String url = "http://localhost:9090/api/game/matching/result";

    public void sendGameMatchingResult(List<MatchingRequestDto> matchingResult) {


        log.info("send main server : ");

        MatchingResultDto matchingResultDto = MatchingResultDto.builder()
                .user1(matchingResult.get(0)).user2(matchingResult.get(1)).user3(matchingResult.get(2)).user4(matchingResult.get(3)).build();

        RestTemplate restTemplate = new RestTemplate();

        // JSON 데이터로 요청할 것이므로 APPLICATION_JSON 설정
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // header와 body 설정
        HttpEntity<?> requestMessage = new HttpEntity<>(matchingResultDto, httpHeaders);

        // post 요청
        ResponseEntity<MatchingResultDto> response = restTemplate.postForEntity(url, requestMessage, MatchingResultDto.class);

        log.info("send main server statusCode: {}", response.getStatusCode());

    }
}
