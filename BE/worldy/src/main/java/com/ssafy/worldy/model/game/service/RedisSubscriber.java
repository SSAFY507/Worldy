package com.ssafy.worldy.model.game.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.worldy.model.game.dto.Emoticon;
import com.ssafy.worldy.model.game.dto.Player;
import com.ssafy.worldy.model.game.exception.CustomException;
import com.ssafy.worldy.model.game.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final RedisTemplate<String, Object> redisTemplate;
    private final SimpMessageSendingOperations template;

    @Override
    public void onMessage(Message message, byte[] pattern) {

        try {

            // 발행된 데이터를 역직렬화
            log.info("Redis Subscriber 호출");
            String publishMessage = redisTemplate.getStringSerializer().deserialize(message.getBody());

            log.info("Publish Message : " + publishMessage);
            Object object = objectMapper.readValue(publishMessage, Object.class);

            if (object instanceof Emoticon) {
                Emoticon emoticon = (Emoticon) object;

                // subscriber에게 메시지 전송
                log.info("Redis Subscribe Message : " + emoticon.toString());
                template.convertAndSend("/sub/chat/room/" + emoticon.getRoomId(), emoticon);
            } else if (object instanceof Player) {
                Player player = (Player) object;

                // subscriber에게 메시지 전송
                log.info("Redis Subscribe Message : " + player.toString());
                template.convertAndSend("/sub/chat/room/" + player.getRoomId(), player);
            }

        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
            new CustomException(CustomExceptionList.SERIALIZER_ERROR);
        }

    }
}
