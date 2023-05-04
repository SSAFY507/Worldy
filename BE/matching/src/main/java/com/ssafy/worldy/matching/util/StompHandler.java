package com.ssafy.worldy.matching.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

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

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        return message;
    }
}
