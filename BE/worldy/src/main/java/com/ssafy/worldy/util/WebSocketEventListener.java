package com.ssafy.worldy.util;

import com.ssafy.worldy.model.game.service.GameMatchingProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Optional;

/**
 * 소켓 감지 이벤트 리스너
 **/
@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketEventListener {

    private final GameMatchingProducer gameMatchingProducer;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        log.info("Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) { //session 연결이 종료됨을 감지

        log.info("Disconnect Websocket");

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String socketType = (String) headerAccessor.getSessionAttributes().get("socketType");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");

        if(socketType == null) return;

        else if(socketType.equals("matching")){
            log.info(socketType+roomId);
            gameMatchingProducer.sendCancelMatchingServer(roomId);
        }
        //messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessage.getRoomId(), chatMessage);
    }
}
