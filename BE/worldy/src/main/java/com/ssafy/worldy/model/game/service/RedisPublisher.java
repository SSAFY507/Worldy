package com.ssafy.worldy.model.game.service;

import com.ssafy.worldy.model.game.dto.Emoticon;
import com.ssafy.worldy.model.game.dto.Player;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

    /**
     * 게임 중 이모티콘 전송
     **/
    public void publish(ChannelTopic topic, Emoticon emoticon) {

        log.info("Topic : " + topic.getTopic() + " Emoticon : " + emoticon.getEmoticon());

        redisTemplate.convertAndSend(topic.getTopic(), emoticon);
    }

    /**
     * 게임 데이터 전송
     **/
    public void publish (ChannelTopic topic, Player player) {

        log.info("Topic : " + topic.getTopic());
        log.info("Player : " + player.toString());

        redisTemplate.convertAndSend(topic.getTopic(), player);
    }
}
