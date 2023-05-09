package com.ssafy.worldy.config;

import com.ssafy.worldy.util.StompHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
//@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Autowired
    StompHandler stompHandler;

    /**
     * publish와 subscribe할 prefix 주소를 등록
     * 메시지 발행 요청 : /pub (Application Destination Prefix) ex) /pub
     * 메시지 구독 요청 : /sub (enable Simple Broker) ex) /sub/{Channel}
     *
     * pub 요청 시 메시지 보낼 때 관련 경로 설정
     * sub 요청 시 messageBroker가 중간에서 해당 방을 구독하고 있는 클라이언트에게 메시지 전송
     **/
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub");
        registry.setApplicationDestinationPrefixes("/pub");
    }

    /**
     * 클라이언트에서 WebSocket 연결 시 사용할 API경로의 endpoint를 지정
     **/
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/stomp/game") // ex) ws://localhost:9090/stomp/game
                .setAllowedOrigins("http://localhost:3000").withSockJS(); // 클라이언트와의 연결은 SocketJS()하므로 설정
    }

    /**
     *  StompHandler가 WebSocket 앞단에서 Token 및 소켓 연결 끊김 등을 체크
     **/
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompHandler);
    }
}
