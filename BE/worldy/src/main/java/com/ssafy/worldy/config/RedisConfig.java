package com.ssafy.worldy.config;

import com.ssafy.worldy.model.game.service.RedisSubscriber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.redis.host}")
    private String redisHost;

    @Value("${spring.redis.port}")
    private int redisPort;

    /**
     * Redis Client 중 Lettuce 방식 사용 (성능이 Jedis 보다 좋음)
     **/
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(redisHost, redisPort);
    }

    /**
     * 실제 publish한 메세지 처리를 위한 listener 설정
     **/
    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainer(MessageListenerAdapter listenerAdapter, ChannelTopic channelTopic) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(redisConnectionFactory());
        container.addMessageListener(listenerAdapter, channelTopic);
        return container;
    }

    /**
     * 실제 메세지를 처리하는 subscriber 추가
     **/
    @Bean
    public MessageListenerAdapter listenerAdapter(RedisSubscriber subscriber) {
        return new MessageListenerAdapter(subscriber, "sendMessage");
    }

    /**
     * 사용할 redisTemplate 설정
     * factory와 Key, Value 직렬화 방식을 설정
     * Key는 String, Value는 json으로 설정
     **/
    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));
        return redisTemplate;
    }

    /**
     * 단일 Topic 사용을 위한 Bean 설정 -> gameroom
     */
    @Bean
    public ChannelTopic channelTopic() {
        return new ChannelTopic("gameroom");
    }
}
