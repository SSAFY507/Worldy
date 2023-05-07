package com.ssafy.worldy.util;

import com.ssafy.worldy.exception.CustomException;
import com.ssafy.worldy.exception.CustomExceptionList;
import com.ssafy.worldy.jwt.TokenProvider;
import com.ssafy.worldy.model.game.dto.PlayerCnt;
import com.ssafy.worldy.model.game.redisrepo.GameRoomRepo;
import com.ssafy.worldy.model.game.service.GameMatchingProducer;
import com.ssafy.worldy.model.game.service.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Optional;

/**
 * interceptor 역할
 * Websocket 요청 처리 전에 제일 먼저 실행됨
 * preSend 메소드에서 클라이언트가 WebSocket기반 STOMP에 CONNECT할 때 헤더로 보낸 Authorization에 담긴 jwt token 검증
 * 연결할 때는 CONNECT, 연결되면 CONNECTED, 전송은 SEND, 구독은 SUBSCRIBE 등
 */
@RequiredArgsConstructor
@Component
@Slf4j
public class StompHandler implements ChannelInterceptor {

    private final GameRoomRepo gameRoomRepo;
    private final TokenProvider tokenProvider;
    private final GameMatchingProducer gameMatchingProducer;
    private final RedisPublisher redisPublisher;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        log.info(accessor.toString());

        if(accessor.getCommand() == StompCommand.CONNECT) { // 소켓 최초 연결시 jwt 검증 & 게임방에 플레이어 수 확인

            //Header의 BearerToken 추출
            String bearerToken = String.valueOf(accessor.getFirstNativeHeader("Authorization"));
            String jwt = null;
            log.info("bearerToken : "+bearerToken);
            log.info("token : "+ (String) message.getHeaders().toString());

            //  Header의 BearerToken에서 jwt 추출
            if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
                jwt  = bearerToken.substring(7);
            }

            // jwt 검증
            if(tokenProvider.validateToken(jwt)) {
                Authentication authentication = tokenProvider.getAuthentication(jwt);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.debug("Security Context에 '{}' 인증 정보를 저장했습니다", authentication.getName());

            } else {
                throw new CustomException(CustomExceptionList.TOKEN_VALID_FAILED);
            }

            // kakaoId 추출
            String kakaoId = SecurityContextHolder.getContext().getAuthentication().getName();
            accessor.getSessionAttributes().put("kakaoId",kakaoId);
        }
        else if (accessor.getCommand() == StompCommand.SUBSCRIBE) { // 구독 요청 시

            // roomId 추출
            String roomId = getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));

            // kakaoId 추출
            String kakaoId = (String) accessor.getSessionAttributes().get("kakaoId");

            String[] splitRoomId = roomId.split("-");
            log.info(roomId);

            // 매칭 요청의 경우 매칭 서버로 전송
            if(splitRoomId.length==2) {
                // 세션에 대한
                // 정보 추가
                accessor.getSessionAttributes().put("socketType", "matching");
                accessor.getSessionAttributes().put("roomId", roomId);
                gameMatchingProducer.sendMatchingServer(roomId);
            } else {
                accessor.getSessionAttributes().put("socketType", "game");

                if(!roomId.equals("null")) {
                    log.info("roomId : " + roomId);
                    log.info(String.valueOf(gameRoomRepo.playerCnt(roomId)));
                    gameRoomRepo.enterGameRoom(kakaoId,roomId); // 게임방에 플레이어 cnt 증가

                    int cnt = (int)gameRoomRepo.playerCnt(roomId);
                    log.info("현재 인원 수 : " +  cnt);

                    PlayerCnt playerCnt = PlayerCnt.builder().type("cnt").roomId(roomId).cnt(cnt).build();
                    redisPublisher.publish(playerCnt);
                }
            }

            log.info("socketType : " + accessor.getSessionAttributes().get("socketType").toString());
            log.info("kakaoId : " + kakaoId);
        }
        return message;
    }

    private String getRoomId(String destination) {
        int lastIndex = destination.lastIndexOf('/');
        if (lastIndex != -1) {
            return destination.substring(lastIndex + 1);
        } else {
            return null;
        }
    }
}
