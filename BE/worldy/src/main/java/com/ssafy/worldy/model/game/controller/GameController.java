package com.ssafy.worldy.model.game.controller;

import com.ssafy.worldy.model.game.dto.GameResultDto;
import com.ssafy.worldy.model.game.dto.GameRoom;
import com.ssafy.worldy.model.game.repo.GameRoomRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
@Slf4j
public class GameController {

    private final GameRoomRepo gameRoomRepo;
    private static final String SUCCESS = "success";

    /**
     * [친구와 같이하는 게임]
     **/
    @GetMapping("/with/friend")
    public ResponseEntity<GameRoom> gameWithFriend() {

        GameRoom gameRoom = gameRoomRepo.createGameRoom();

        return new ResponseEntity<>(gameRoom, HttpStatus.OK);
    }

    /**
     * [게임 종료]
     **/
    @GetMapping("/finish")
    public ResponseEntity<String> gameFinish(@RequestParam String roomId) {

        gameRoomRepo.deleteGameRoom(roomId);

        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }

    /**
     * [게임 정보 저장]
     **/
    @PostMapping("/result")
    public ResponseEntity<String> gameResult(@RequestBody GameResultDto gameResultDto) {



        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }
}
