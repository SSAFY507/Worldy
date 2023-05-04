package com.ssafy.worldy.matching.model.service;

import com.ssafy.worldy.matching.model.dto.MatchingRequestDto;
import com.ssafy.worldy.matching.model.queue.QueueList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameMatchingConsumer {

    private final QueueList queueList;

    @RabbitListener(queues = "worldy.matching.queue")
    public void matchingConsume(MatchingRequestDto matchingRequestDto) {
        log.info("match : " +matchingRequestDto.toString());

        if(matchingRequestDto.getMmr()>=0 && matchingRequestDto.getMmr()<500) {
            queueList.getBRONZE2().add(matchingRequestDto);
        } else if(matchingRequestDto.getMmr()>=500 && matchingRequestDto.getMmr()<1000) {
            queueList.getBRONZE1().add(matchingRequestDto);
        } else if(matchingRequestDto.getMmr()>=1000 && matchingRequestDto.getMmr()<1500) {
            queueList.getSILVER2().add(matchingRequestDto);
        } else if(matchingRequestDto.getMmr()>=1500 && matchingRequestDto.getMmr()<2000) {
            queueList.getSILVER1().add(matchingRequestDto);
        } else if(matchingRequestDto.getMmr()>=2000 && matchingRequestDto.getMmr()<2500) {
            queueList.getGOLD2().add(matchingRequestDto);
        } else if(matchingRequestDto.getMmr()>=2500 && matchingRequestDto.getMmr()<3000) {
            queueList.getGOLD1().add(matchingRequestDto);
        } else if(matchingRequestDto.getMmr()>=3000 && matchingRequestDto.getMmr()<3500) {
            queueList.getPLATINUM2().add(matchingRequestDto);
        } else if(matchingRequestDto.getMmr()>=3500 && matchingRequestDto.getMmr()<=4000) {
            queueList.getPLATINUM1().add(matchingRequestDto);
        }
    }

    @RabbitListener(queues = "worldy.cancel.queue")
    public void cancelMatchingConsume(MatchingRequestDto matchingRequestDto) {
        log.info("cancel : " + matchingRequestDto.toString());

        // 매칭 과정 중 취소한 유저 관리
        queueList.getCANCEL().put(matchingRequestDto.getKakaoId(), matchingRequestDto);
    }
}
