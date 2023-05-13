package com.ssafy.worldy.controller.game;

import com.ssafy.worldy.model.game.dto.*;
import com.ssafy.worldy.model.game.repo.GameRoomRepo;
import com.ssafy.worldy.model.game.service.RedisPublisher;
import com.ssafy.worldy.model.quiz.dto.MultiAnswerDto;
import com.ssafy.worldy.model.quiz.dto.QuizDto;
import com.ssafy.worldy.model.quiz.entity.MultiAnswer;
import com.ssafy.worldy.model.quiz.entity.Quiz;
import com.ssafy.worldy.model.quiz.repo.MultiAnswerRepo;
import com.ssafy.worldy.model.quiz.repo.QuizRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class GameSocketController {

    private final RedisPublisher redisPublisher;
    private final GameRoomRepo gameRoomRepo;
    private final QuizRepo quizRepo;
    private final MultiAnswerRepo multiAnswerRepo;

    /**
     * [/pub/chat/emoticon로 들어오는 메시징을 처리]
     **/
    @MessageMapping("/game/emoticon")
    public void emoticon(Emoticon emoticon) {

        log.info("WebSocket Writer kakaoId : " + emoticon.getKakaoId());
        log.info("WebSocket Writer Emoticon : " + emoticon.toString());

        redisPublisher.publish(emoticon);
    }

    /**
     * [/pub/game/player 들어오는 메시징을 처리]
     **/
    @MessageMapping("/game/player")
    public void player(Data data) {

        log.info("WebSocket Writer Data Type : " + data.getType());
        log.info("WebSocket Writer Game Data : " + data.toString());

        redisPublisher.publish(data);
    }

    /**
     * [/pub/game/map 들어오는 메시징을 처리]
     **/
    @MessageMapping("/game/map")
    public void map(WorldMap worldMap) {

        log.info("WebSocket Writer Data Type : " + worldMap.getType());
        log.info("WebSocket Writer Game Data : " + worldMap.toString());

        redisPublisher.publish(worldMap);
    }

    /**
     * [/pub/game/quiz로 들어오는 메시징을 처리]
     **/
    @MessageMapping("/game/quiz/{kakaoId}/{roomId}/{nationId}")
    public void quiz(@DestinationVariable String kakaoId, @DestinationVariable String roomId, @DestinationVariable Long nationId) {

        log.info("WebSocket roomId : " + roomId);
        log.info("WebSocket NationId : " + nationId);
        log.info("WebSocket kakaoId : " + kakaoId);

        // 퀴즈 조회
        Quiz quiz = quizRepo.findRandQuizByNationId(nationId);

        List<MultiAnswerDto> multiAnswerList = null;

        // 퀴즈 타입이 객관식이면 객관식 보기 조회
        if(quiz.getQuizType().equals("multi")) {
            multiAnswerList = new ArrayList<>();

            List<MultiAnswer> multiAnswers = multiAnswerRepo.findByQuiz(quiz);
            for (MultiAnswer multiAnswer : multiAnswers) {
                multiAnswerList.add(multiAnswer.toMultiAnswerDto());
            }
        }

        // 퀴즈 DTO 생성
        QuizDto quizDto = quiz.toDto();
        quizDto.setMultiAnswerList(multiAnswerList);

        GameQuiz gameQuizDto = GameQuiz.builder()
                .roomId(roomId).type("quiz").kakaoId(kakaoId).quizDto(quizDto).build();

        redisPublisher.publish(gameQuizDto);
    }

    /**
     * [/pub/game/meta 들어오는 메시징을 처리]
     **/
    @MessageMapping("/game/meta")
    public void map(MetaData metaData) {

        log.info("WebSocket Writer Data Type : " + metaData.getType());
        log.info("WebSocket Writer Game Data : " + metaData.toString());

        redisPublisher.publish(metaData);
    }
}
