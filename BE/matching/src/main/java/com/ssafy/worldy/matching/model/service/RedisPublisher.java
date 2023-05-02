package com.ssafy.worldy.matching.model.service;

import com.ssafy.worldy.matching.model.dto.MatchingRequestDto;
import com.ssafy.worldy.matching.model.dto.MatchingResultDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class RedisPublisher {
    private final RedisTemplate<String, Object> redisTemplate;
    private final ChannelTopic topic;

    public void publish (List<MatchingRequestDto> matchingResult) {

        log.info("Topic : " + topic.getTopic());
        log.info("Player : " + matchingResult.toString());

        MatchingResultDto matchingResultDto = MatchingResultDto.builder()
                .user1(matchingResult.get(0)).user2(matchingResult.get(1)).user3(matchingResult.get(2)).user4(matchingResult.get(3)).build();

        redisTemplate.convertAndSend(topic.getTopic(), matchingResultDto);
    }

}
