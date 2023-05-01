package com.ssafy.worldy.matching.algorithm;

import com.ssafy.worldy.matching.model.dto.MatchingRequestDto;
import com.ssafy.worldy.matching.model.queue.QueueList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Component
public class Match {
    private final QueueList queueList;
    private static boolean matched;
    private static int gameMatchingQueueIdx;
    private static Map<String,Boolean> matchingUser; // 이미 매칭된 유저 관리

    @Scheduled(fixedDelay = 10000, initialDelay = 1000) // 1초 후 10초마다 동작
    public void matching(){
        log.info("analyze game matching");

        matchingUser = new HashMap<>();
        // thirdQueueUsers = new HashMap<>();

        for (PriorityQueue<MatchingRequestDto> queue : queueList.getQueueList()) {
            log.info(queue.toString());
        }

        for (PriorityQueue<MatchingRequestDto> queue : queueList.getQueueList()) {

            match: while (queue.size() >= 4) {// 대기큐에 4명이 이상이 있을 경우

                List<MatchingRequestDto> matchingResult = new ArrayList<>();
                for (int i = 0; i < 4; i++) {
                    MatchingRequestDto user = queue.poll();

                    // 이미 매칭된 유저를 포함할 경우 현재 매칭 과정 취소 후 해당 유저를 대기큐에서 제거
                    if (matchingUser.containsKey(user.getKakaoId()+user.getStartWaitingTime())) {
                        queue.addAll(matchingResult);
                        continue match; // 대기큐 재탐색
                    }

                    // 매칭을 취소한 유저가 포함될 경우 현재 매칭 과정 취소 후 해당 유저를 대기큐에서 제외
                    if (queueList.getCANCEL().containsKey(user.getKakaoId())) {

                        MatchingRequestDto cancelUser = queueList.getCANCEL().get(user.getKakaoId());

                        LocalDate cancelTime = LocalDate.parse(cancelUser.getStartWaitingTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                        LocalDate userStartWaitingTime = LocalDate.parse(user.getStartWaitingTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

                        if(userStartWaitingTime.compareTo(cancelTime)<=0) {// (2022-08-11)와 (2022-08-31) 비교 결과: -20 즉, 음수 반환 시 cancelTime이 userStartWaitingTime보다 이후
                            queue.addAll(matchingResult);
                            continue match; // 다음 큐 탐색
                        }
                    }

                    matchingResult.add(user); // 매칭 결과에 넣기
                }

                log.info("queue game start!");

                for (MatchingRequestDto matchingRequestDto : matchingResult) {
                    matchingUser.put(matchingRequestDto.getKakaoId()+matchingRequestDto.getStartWaitingTime(), true); // 매칭된 유저 정보 넣기
                    log.info(matchingRequestDto.toString());

                }
            }
        }

        // 모든 대기큐에서 매칭된 유저와 5분 이상 대기한 유저 지우기
        for (PriorityQueue<MatchingRequestDto> queue : queueList.getQueueList()) {
            int size = queue.size();
            for(int idx=0;idx<size;idx++) {
                MatchingRequestDto user = queue.poll();

                LocalDateTime now = LocalDateTime.now();
                LocalDateTime startWaitingTime = LocalDateTime.parse(user.getStartWaitingTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

                Duration diff = Duration.between(now.toLocalTime(), startWaitingTime.toLocalTime());

                // 310000 : 5분 10초
                // 대기 시간 최대 5분이 지난 유저는 대기큐에서 삭제
                if(diff.getSeconds()>=310000) continue;

                // 매칭된 유저를 대기큐에서 삭제
                for( Map.Entry<String, Boolean> entry : matchingUser.entrySet() ){
                    String key = entry.getKey();
                    if(!key.equals(user.getKakaoId()+user.getStartWaitingTime())) {
                        queue.add(user);
                    }
                }

                // 중간에 나간 유저 대기큐에서 삭제
            }
        }

        // 5번째 매칭 큐 clear (5분)
        queueList.getALL().clear();

        // 4번째 매칭 큐 -> 5번째 매칭 큐
        moved(queueList.getBRONZE_SILVER_GOLD(),queueList.getALL());
        PriorityQueue<MatchingRequestDto> q = new PriorityQueue<>();
        q.addAll(queueList.getSILVER_GOLD_PLATINUM());

        while (q.size()>0) {
            MatchingRequestDto user = q.poll();

            if (user.getMmr()>=3000) queueList.getALL().add(user); // 플래티넘만 넣어주기
        }

        // 4번째 매칭 큐 clear
        queueList.getBRONZE_SILVER_GOLD().clear();
        queueList.getSILVER_GOLD_PLATINUM().clear();

        // 4번째 대기큐 확대
        moved(queueList.getBRONZE_SILVER(),queueList.getBRONZE_SILVER_GOLD());
        moved(queueList.getGOLD_PLATINUM(),queueList.getSILVER_GOLD_PLATINUM());

        q.clear();
        q.addAll(queueList.getSILVER_GOLD());

        while (q.size()>0) {
            MatchingRequestDto user = q.poll();

            if (user.getMmr()>=2000) queueList.getBRONZE_SILVER_GOLD().add(user); // 골드만 넣어주기
        }
        q.clear();
        q.addAll(queueList.getSILVER_GOLD());

        while (q.size()>0) {
            MatchingRequestDto user = q.poll();

            if (user.getMmr()<2000) queueList.getSILVER_GOLD_PLATINUM().add(user); // 실버만 넣어주기
        }

        // 3번째 매칭 큐 clear
        queueList.getBRONZE_SILVER().clear();
        queueList.getSILVER_GOLD().clear();
        queueList.getGOLD_PLATINUM().clear();

        // 3번째 대기큐 확대
        moved(queueList.getBRONZE(),queueList.getBRONZE_SILVER());

        movedDup(queueList.getSILVER(),queueList.getBRONZE_SILVER(), queueList.getSILVER_GOLD());

        movedDup(queueList.getGOLD(), queueList.getSILVER_GOLD(), queueList.getGOLD_PLATINUM());

        moved(queueList.getPLATINUM(),queueList.getGOLD_PLATINUM());

        // 2번째 매칭 큐 clear
        queueList.getBRONZE().clear();
        queueList.getSILVER().clear();
        queueList.getGOLD().clear();
        queueList.getPLATINUM().clear();

        // 2번째 대기큐 확대
        moved(queueList.getBRONZE2(), queueList.getBRONZE());
        moved(queueList.getBRONZE1(), queueList.getBRONZE());

        moved(queueList.getSILVER2(), queueList.getSILVER());
        moved(queueList.getSILVER1(), queueList.getSILVER());

        moved(queueList.getGOLD2(), queueList.getGOLD());
        moved(queueList.getGOLD1(), queueList.getGOLD());

        moved(queueList.getPLATINUM2(), queueList.getPLATINUM());
        moved(queueList.getPLATINUM1(), queueList.getPLATINUM());
    }

    // 다음 큐로 이동
    private void moved(PriorityQueue<MatchingRequestDto> preTierQueue, PriorityQueue<MatchingRequestDto> nxtTierQueue) {
        nxtTierQueue.addAll(preTierQueue);
    }

    // 두개의 다음 큐로 이동
    private void movedDup(PriorityQueue<MatchingRequestDto> preTierQueue, PriorityQueue<MatchingRequestDto> nxtTierQueue1,  PriorityQueue<MatchingRequestDto> nxtTierQueue2) {
        nxtTierQueue1.addAll(preTierQueue);
        nxtTierQueue2.addAll(preTierQueue);
    }

    //
    @Scheduled(fixedDelay = 60000, initialDelay = 1000) // 1초 후 60초마다 동작
    public void removeCancelUser() {

        for( Map.Entry<String, MatchingRequestDto> entry : queueList.getCANCEL().entrySet() ){
            MatchingRequestDto matchingRequestDto = entry.getValue();

            LocalDateTime now = LocalDateTime.now();
            LocalDateTime startWaitingTime = LocalDateTime.parse(matchingRequestDto.getStartWaitingTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            Duration diff = Duration.between(now.toLocalTime(), startWaitingTime.toLocalTime());

            // 70초 지난 대기 취소 요청은 삭제
            if(diff.getSeconds()>=70000) {
                queueList.getCANCEL().remove(matchingRequestDto.getKakaoId()+matchingRequestDto.getStartWaitingTime());
            }
        }
    }
}
