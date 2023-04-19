package com.ssafy.worldy.util;

import com.ssafy.worldy.model.game.exception.CustomException;
import com.ssafy.worldy.model.game.exception.CustomExceptionList;
import com.ssafy.worldy.model.game.repo.GameRoomRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * interceptor 역할
 * Websocket 요청 처리 전에 제일 먼저 실행됨
 * preSend 메소드에서 클라이언트가 WebSocket기반 STOMP에 CONNECT할 때 헤더로 보낸 Authorization에 담긴 jwt token 검증
 */
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private GameRoomRepo gameRoomRepo;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if(accessor.getCommand() == StompCommand.CONNECT) {

//            // spring security 구현 후 토큰 검증
//            if(!tokenProvider.validateToken(accessor.getFirstNativeHeader("Authorization")))
//                throw new AccessDeniedException("");
        } else if (accessor.getCommand() == StompCommand.SUBSCRIBE) { // 최초 연결

            String roomId = getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));

            if(gameRoomRepo.playerCnt(roomId)==4) {
                new CustomException(CustomExceptionList.ENTER_GAME_ERROR);
            } else {
                String kakaoId = SecurityContextHolder.getContext().getAuthentication().getName();
                gameRoomRepo.enterGameRoom(kakaoId,roomId); // 게임방에 플레이어 저장
            }
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
