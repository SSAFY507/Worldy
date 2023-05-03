package com.ssafy.worldy.model.game.service;

import com.ssafy.worldy.model.game.dto.Emoticon;
import com.ssafy.worldy.model.game.dto.GameQuiz;
import com.ssafy.worldy.model.game.dto.MatchingResultDto;
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
    private final ChannelTopic topic;
    /**
     * 게임 중 이모티콘 전송
     **/
    public void publish(Emoticon emoticon) {

        log.info("Topic : " + topic.getTopic() + " Emoticon : " + emoticon.toString());

        redisTemplate.convertAndSend(topic.getTopic(), emoticon);
    }

    /**
     * 게임 데이터 전송
     **/
    public void publish (Player player) {

        log.info("Topic : " + topic.getTopic());
        log.info("Player : " + player.toString());

        redisTemplate.convertAndSend(topic.getTopic(), player);
    }

    /**
     * 게임 매칭 데이터 전송
     **/
    public void publish (MatchingResultDto matchingResultDto) {

        log.info("Topic : " + topic.getTopic());

        redisTemplate.convertAndSend(topic.getTopic(), matchingResultDto);
    }

    /**
     * 게임 퀴즈 데이터 전송
     **/
    public void publish(GameQuiz gameQuizDto) {

        log.info("Topic : " + topic.getTopic());
        log.info("Quiz : " + gameQuizDto.toString());

        redisTemplate.convertAndSend(topic.getTopic(), gameQuizDto);
    }
}
