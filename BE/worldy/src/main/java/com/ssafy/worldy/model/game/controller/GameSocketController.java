package com.ssafy.worldy.model.game.controller;

import com.ssafy.worldy.model.game.dto.Emoticon;
import com.ssafy.worldy.model.game.dto.Player;
import com.ssafy.worldy.model.game.repo.GameRoomRepo;
import com.ssafy.worldy.model.game.service.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class GameSocketController {

    private final RedisPublisher redisPublisher;
    private final GameRoomRepo gameRoomRepo;

    /**
     * [/pub/chat/emoticon로 들어오는 메시징을 처리]
     **/
    @MessageMapping("/game/emoticon")
    public void emoticon(Emoticon emoticon) {

        log.info("WebSocket Writer Nickname : " + emoticon.getKakaoId());
        log.info("WebSocket Writer Emoticon : " + emoticon.toString());

        redisPublisher.publish(emoticon);
    }

    /**
     * [/pub/game/data로 들어오는 메시징을 처리]
     **/
    @MessageMapping("/game/player")
    public void player(Player player) {

        log.info("WebSocket Writer Nickname : " + player.getKakaoId());
        log.info("WebSocket Writer Emoticon : " + player.toString());

        redisPublisher.publish(player);
    }
}
