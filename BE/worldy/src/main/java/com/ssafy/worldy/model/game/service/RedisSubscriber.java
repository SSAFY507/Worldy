package com.ssafy.worldy.model.game.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.worldy.model.game.dto.*;
import com.ssafy.worldy.exception.CustomException;
import com.ssafy.worldy.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class RedisSubscriber {

    private final ObjectMapper objectMapper;
    private final RedisTemplate<String, Object> redisTemplate;
    private final SimpMessageSendingOperations template;

    public void sendMessage(String publishMessage) {

        try {

            // 발행된 데이터를 역직렬화
            log.info("Redis Subscriber 호출");
            log.info("Publish Message : " + publishMessage);

            if (publishMessage.contains("emoticon")) {

                Emoticon emoticon = objectMapper.readValue(publishMessage, Emoticon.class);

                // subscriber에게 메시지 전송
                log.info("Redis Subscribe Message : " + emoticon.toString());
                template.convertAndSend("/sub/" + emoticon.getRoomId(), emoticon);
            } else if (publishMessage.contains("player")) {

                Data data = objectMapper.readValue(publishMessage, Data.class);

                // subscriber에게 메시지 전송
                log.info("Redis Subscribe Message : " + data.toString());
                template.convertAndSend("/sub/" + data.getRoomId(), data);
            } else if (publishMessage.contains("quiz")) {

                GameQuiz gameQuiz = objectMapper.readValue(publishMessage, GameQuiz.class);

                // subscriber에게 메시지 전송
                log.info("Redis Subscribe Message : " + gameQuiz.toString());
                template.convertAndSend("/sub/" + gameQuiz.getRoomId(), gameQuiz);
            } else if (publishMessage.contains("cnt")) {

                PlayerCnt playerCnt = objectMapper.readValue(publishMessage, PlayerCnt.class);

                // subscriber에게 메시지 전송
                log.info("Redis Subscribe Message : " + playerCnt.toString());
                template.convertAndSend("/sub/" + playerCnt.getRoomId(), playerCnt);
            } else if (publishMessage.contains("worldmap")) {

                WorldMap worldMap = objectMapper.readValue(publishMessage, WorldMap.class);

                // subscriber에게 메시지 전송
                log.info("Redis Subscribe Message : " + worldMap.toString());
                template.convertAndSend("/sub/" + worldMap.getRoomId(), worldMap);
            } else {

                // subscriber에게 메시지 전송
                log.info("Redis Subscribe Message : ");

                MatchingResult matchingResultDto = objectMapper.readValue(publishMessage, MatchingResult.class);

                template.convertAndSend("/sub/" + matchingResultDto.getUser1().getRoomId(),matchingResultDto);
                template.convertAndSend("/sub/" + matchingResultDto.getUser2().getRoomId(),matchingResultDto);
                template.convertAndSend("/sub/" + matchingResultDto.getUser3().getRoomId(),matchingResultDto);
                template.convertAndSend("/sub/" + matchingResultDto.getUser4().getRoomId(),matchingResultDto);
            }
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
            new CustomException(CustomExceptionList.SERIALIZER_ERROR);
        }

    }
}
