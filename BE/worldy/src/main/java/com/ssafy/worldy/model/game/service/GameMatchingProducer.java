package com.ssafy.worldy.model.game.service;

import com.ssafy.worldy.exception.CustomException;
import com.ssafy.worldy.exception.CustomExceptionList;
import com.ssafy.worldy.model.game.dto.MatchingRequestDto;
import com.ssafy.worldy.model.user.entity.User;
import com.ssafy.worldy.model.user.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameMatchingProducer {

    private final UserRepo userRepo;
    private final RabbitTemplate rabbitTemplate;

    /**
     * 데이터를 송신큐에 담아 매칭 서버로 순차적으로 송신
     **/
    public void sendMatchingServer(String roomId) {

        String[] splitRoomId = roomId.split("-");

        User user = userRepo.findByKakaoId(splitRoomId[1]).orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));

        LocalDateTime startWaitingTime = LocalDateTime.now();
        String startWaitingTimeST = startWaitingTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SS"));

        MatchingRequestDto matchingRequestDto = MatchingRequestDto.builder()
                .kakaoId(user.getKakaoId()).roomId(roomId).mmr(user.getMmr()).level(user.getLevel()).startWaitingTime(startWaitingTimeST).nickName(user.getNickName()).profileImg(user.getProfileImg()).build();

        log.info("send message : " + matchingRequestDto.toString());
        rabbitTemplate.convertAndSend("worldy.matching.exchange", "worldy.key", matchingRequestDto);
    }

    public void sendCancelMatchingServer(String roomId) {

        String[] splitRoomId = roomId.split("-");

        User user = userRepo.findByKakaoId(splitRoomId[1]).orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));

        LocalDateTime startWaitingTime = LocalDateTime.now();
        String startWaitingTimeST = startWaitingTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SS"));

        MatchingRequestDto matchingRequestDto = MatchingRequestDto.builder()
                .kakaoId(user.getKakaoId()).roomId(roomId).mmr(user.getMmr()).level(user.getLevel()).startWaitingTime(startWaitingTimeST).nickName(user.getNickName()).profileImg(user.getProfileImg()).build();

        log.info("send message : " + matchingRequestDto.toString());
        rabbitTemplate.convertAndSend("worldy.matching.exchange", "worldy.cancle.key", matchingRequestDto);
    }
}
