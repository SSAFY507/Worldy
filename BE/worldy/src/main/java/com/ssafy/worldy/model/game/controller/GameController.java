package com.ssafy.worldy.model.game.controller;

import com.ssafy.worldy.model.game.dto.Emoticon;
import com.ssafy.worldy.model.game.dto.GameRoom;
import com.ssafy.worldy.model.game.dto.Player;
import com.ssafy.worldy.model.game.repo.GameRoomRepo;
import com.ssafy.worldy.model.game.service.RedisPublisher;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class GameController {

    private final RedisPublisher redisPublisher;
    private final GameRoomRepo gameRoomRepo;

    /**
     * /pub/chat/emoticon로 들어오는 메시징을 처리
     **/
    @MessageMapping("/game/emoticon")
    public void emoticon(Emoticon emoticon) {

        log.info("WebSocket Writer Nickname : " + emoticon.getKakaoId());
        log.info("WebSocket Writer Emoticon : " + emoticon.toString());

        redisPublisher.publish(gameRoomRepo.getTopic(emoticon.getRoomId()),emoticon);
    }

    /**
     * /pub/game/data로 들어오는 메시징을 처리
     **/
    @MessageMapping("/game/player")
    public void player(Player player) {

        log.info("WebSocket Writer Nickname : " + player.getKakaoId());
        log.info("WebSocket Writer Emoticon : " + player.toString());

        redisPublisher.publish(gameRoomRepo.getTopic(player.getRoomId()),player);
    }

    /**
     * 친구와 같이하는 게임
     **/
    @GetMapping("/game/with/friend")
    public ResponseEntity<GameRoom> gameWithFriend() {

        GameRoom gameRoom = gameRoomRepo.createGameRoom();

        return new ResponseEntity<>(gameRoom, HttpStatus.OK);
    }
}
