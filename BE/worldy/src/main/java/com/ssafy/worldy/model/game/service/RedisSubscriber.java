package com.ssafy.worldy.model.game.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.worldy.model.game.dto.Emoticon;
import com.ssafy.worldy.model.game.dto.Player;
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
                Player player = objectMapper.readValue(publishMessage, Player.class);

                // subscriber에게 메시지 전송
                log.info("Redis Subscribe Message : " + player.toString());
                template.convertAndSend("/sub/" + player.getRoomId(), player);
            }
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
            new CustomException(CustomExceptionList.SERIALIZER_ERROR);
        }

    }
}