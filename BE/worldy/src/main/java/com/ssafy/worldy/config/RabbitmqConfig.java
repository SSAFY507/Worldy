package com.ssafy.worldy.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@Slf4j
public class RabbitmqConfig {

    @Value("${spring.rabbitmq.host}")
    private String host;
    @Value("${spring.rabbitmq.username}")
    private String username;
    @Value("${spring.rabbitmq.password}")
    private String password;
    @Value("${spring.rabbitmq.port}")
    private int port;

    @Bean
    Queue queue() {
        /**
         * Queue(param1, param2)
         * param1 : queue 이름
         * param2 : durable(영속성) 속성
         *          true - RabbitMQ 종료 시 queue 유지
         *          false - RabbitMQ 종료 시 queue 삭제
         **/
        return new Queue("worldy.matching.queue", true);
    }

    @Bean
    Queue queue2() {
        /**
         * Queue(param1, param2)
         * param1 : queue 이름
         * param2 : durable(영속성) 속성
         *          true - RabbitMQ 종료 시 queue 유지
         *          false - RabbitMQ 종료 시 queue 삭제
         **/
        return new Queue("worldy.cancel.queue", true);
    }

    @Bean
    DirectExchange directExchange() {
        return new DirectExchange("worldy.matching.exchange");
    }

    @Bean
    Binding binding(DirectExchange directExchange, Queue queue) {
        return BindingBuilder.bind(queue).to(directExchange).with("worldy.key");
    }

    @Bean
    Binding binding2(DirectExchange directExchange) {
        return BindingBuilder.bind(queue2()).to(directExchange).with("worldy.cancle.key");
    }


    @Bean
    RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, MessageConverter messageConverter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter);
        return rabbitTemplate;
    }

    @Bean
    ConnectionFactory connectionFactory() {
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
        connectionFactory.setHost(host);
        connectionFactory.setPort(port);
        connectionFactory.setUsername(username);
        connectionFactory.setPassword(password);
        return connectionFactory;
    }

    @Bean
    MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

}
