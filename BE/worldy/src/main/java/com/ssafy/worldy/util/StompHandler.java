package com.ssafy.worldy.util;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

/**
 * interceptor 역할
 * Websocket 요청 처리 전에 제일 먼저 실행됨
 * preSend 메소드에서 클라이언트가 WebSocket기반 STOMP에 CONNECT할 때 헤더로 보낸 Authorization에 담긴 jwt token 검증
 */
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if(accessor.getCommand() == StompCommand.CONNECT) {

//            // spring security 구현 후 토큰 검증
//            if(!tokenProvider.validateToken(accessor.getFirstNativeHeader("Authorization")))
//                throw new AccessDeniedException("");
        }

        return message;
    }
}
