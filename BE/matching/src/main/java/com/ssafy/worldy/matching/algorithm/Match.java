package com.ssafy.worldy.matching.algorithm;

import com.ssafy.worldy.matching.model.dto.MatchingRequestDto;
import com.ssafy.worldy.matching.model.queue.QueueList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

@RequiredArgsConstructor
@Slf4j
public class Match {
    private final QueueList queueList;
    private static boolean matched;
    @Scheduled(fixedDelay = 10000, initialDelay = 1000) // 1초 후 10초마다 동작
    public void matching(){

        while(true) {
            matched = false;

            int idx = 1;
            for (PriorityQueue<MatchingRequestDto> queue :queueList.getQueueList()) {

                if(queue.size()>=4&&idx>=13&&idx<=15) {// 3번째 매칭 중일 경우
                    matched = true;
                } else if (queue.size()>=4&&idx>=16&&idx<=17){ // 4번째 매칭 중일 경우
                    matched = true;
                } else if (queue.size()>=4) { // 큐 안에 4명이 모이면
                    List<String> matchingResult = new ArrayList<>();

                    matched = true;

                    for(int i=0;i<4;i++){
                        matchingResult.add(queue.poll().getKakaoId());

                    }

                    log.info("matching");

                }

                idx ++;
                if(!matched) break;
            }

        }

    }
}
