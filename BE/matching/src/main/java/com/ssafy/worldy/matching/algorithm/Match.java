package com.ssafy.worldy.matching.algorithm;

import com.ssafy.worldy.matching.model.dto.MatchingRequestDto;
import com.ssafy.worldy.matching.model.queue.QueueList;
import com.ssafy.worldy.matching.model.service.GameMatchingSend;
import com.ssafy.worldy.matching.model.service.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

@RequiredArgsConstructor
@Slf4j
@Component
public class Match {
    private final QueueList queueList;
    private final GameMatchingSend gameMatchingSend;
    //private static Map<String,Boolean> matchingUser =  new HashMap<>(); // 이미 매칭된 유저 관리
    private final RedisPublisher redisPublisher;

    @Scheduled(fixedDelay = 10000, initialDelay = 1000) // 1초 후 10초마다 동작
    public void matching(){
        log.info("analyze game matching");

        // thirdQueueUsers = new HashMap<>();

        for (PriorityQueue<MatchingRequestDto> queue : queueList.getQueueList()) {
            log.info(queue.toString());
        }

        for (PriorityQueue<MatchingRequestDto> queue : queueList.getQueueList()) {

            match: while (queue.size() >= 4) {// 대기큐에 4명이 이상이 있을 경우

                log.info("4명넘음");

                List<MatchingRequestDto> matchingResult = new ArrayList<>();
                for (int i = 0; i < 4; i++) {
                    MatchingRequestDto user = queue.poll();

                    // 이미 매칭된 유저를 포함할 경우 현재 매칭 과정 취소 후 해당 유저를 대기큐에서 제거
                    if (queueList.getMATCH().containsKey(user.getKakaoId()+user.getStartWaitingTime())) {
                        queue.addAll(matchingResult);
                        log.info("매칭 중 중복 제거");
                        continue match; // 대기큐 재탐색
                    }

                    // 매칭을 취소한 유저가 포함될 경우 현재 매칭 과정 취소 후 해당 유저를 대기큐에서 제외
                    if (queueList.getCANCEL().containsKey(user.getKakaoId())) {

                        MatchingRequestDto cancelUser = queueList.getCANCEL().get(user.getKakaoId());

                        LocalDateTime cancelTime = LocalDateTime.parse(cancelUser.getStartWaitingTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SS"));
                        LocalDateTime userStartWaitingTime = LocalDateTime.parse(user.getStartWaitingTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SS"));

                        if(userStartWaitingTime.isBefore(cancelTime)) {// (2022-08-11)와 (2022-08-31) 비교 결과: -20 즉, 음수 반환 시 cancelTime이 userStartWaitingTime보다 이후
                            queue.addAll(matchingResult);
                            log.info("매칭 중 취소한 유저 제거" + cancelTime + " " +userStartWaitingTime );
                            log.info(matchingResult.toString());
                            continue match; // 다음 큐 탐색
                        }
                    }

                    matchingResult.add(user); // 매칭 결과에 넣기
                }

                log.info("queue game start!");

                for (MatchingRequestDto matchingRequestDto : matchingResult) {
                    queueList.getMATCH().put(matchingRequestDto.getKakaoId()+matchingRequestDto.getStartWaitingTime(), matchingRequestDto); // 매칭된 유저 정보 넣기
                    log.info(matchingRequestDto.toString());
                    //redisPublisher.publish(matchingResult);
                }
                gameMatchingSend.sendGameMatchingResult(matchingResult);
            }
        }

        // 모든 대기큐에서 매칭된 유저와 5분 이상 대기한 유저와 매칭 취소 유저 지우기
        for (PriorityQueue<MatchingRequestDto> queue : queueList.getQueueList()) {
            int size = queue.size();
            delete : for(int idx=0;idx<size;idx++) {
                MatchingRequestDto user = queue.poll();
//
//                // 1. 중간에 나간 유저 대기큐에서 삭제
                if (queueList.getCANCEL().containsKey(user.getKakaoId())) {

                    MatchingRequestDto cancelUser = queueList.getCANCEL().get(user.getKakaoId());

                    LocalDateTime cancelTime = LocalDateTime.parse(cancelUser.getStartWaitingTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SS"));
                    LocalDateTime userStartWaitingTime = LocalDateTime.parse(user.getStartWaitingTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SS"));

                    // 대기한 유저가 취소한 유저라면 큐에서 삭제(다시 넣지 X )
                    if(userStartWaitingTime.isBefore(cancelTime)) {// (2022-08-11)와 (2022-08-31) 비교 결과: -20 즉, 음수 반환 시 cancelTime이 userStartWaitingTime보다 이후
                        log.info("매칭 종료 후 취소한 유저 제거 취소 시간 "+ cancelTime + "매칭 시간 " +  userStartWaitingTime);
                        continue delete;
                    }
                }

                // 2. 대기 시간 최대 5분이 지난 유저는 대기큐에서 삭제
                LocalDateTime now = LocalDateTime.now();
                LocalDateTime startWaitingTime = LocalDateTime.parse(user.getStartWaitingTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SS"));

                Duration diff = Duration.between(startWaitingTime.toLocalTime(),now.toLocalTime());
                log.info("diff "+diff.getSeconds());

                // 310 : 5분 10초
                if(diff.getSeconds()>=310) continue delete;

                // 3. 매칭된 유저를 대기큐에서 삭제
                if (queueList.getMATCH().containsKey(user.getKakaoId()+user.getStartWaitingTime())) {
                    log.info("매칭된 유저 삭제 대기큐 " + user.getKakaoId()+user.getStartWaitingTime());
                    continue delete;
                }

                // 3가지 조건에 걸리지 않으면 다시 대기큐 삽입
                queue.add(user);
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
    @Scheduled(fixedDelay = 310000, initialDelay = 1000) // 5분 10초마다 동작
    public void removeCancelUser() {

        for( Map.Entry<String, MatchingRequestDto> entry : queueList.getCANCEL().entrySet() ){
            MatchingRequestDto matchingRequestDto = entry.getValue();

            LocalDateTime now = LocalDateTime.now();
            LocalDateTime startWaitingTime = LocalDateTime.parse(matchingRequestDto.getStartWaitingTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SS"));

            Duration diff = Duration.between(startWaitingTime.toLocalTime(),now.toLocalTime());

            // 5분 10초 지난 대기 취소 요청은 삭제
            if(diff.getSeconds()>=310) {
                queueList.getCANCEL().remove(matchingRequestDto.getKakaoId()+matchingRequestDto.getStartWaitingTime());
            }
        }
    }

    @Scheduled(fixedDelay = 310000, initialDelay = 1000) // 5분 10초마다 동작
    public void removeMatchUser() {

        for( Map.Entry<String, MatchingRequestDto> entry : queueList.getMATCH().entrySet() ){
            MatchingRequestDto matchingRequestDto = entry.getValue();

            LocalDateTime now = LocalDateTime.now();

            LocalDateTime startWaitingTime = LocalDateTime.parse(matchingRequestDto.getStartWaitingTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SS"));

            Duration diff = Duration.between(startWaitingTime.toLocalTime(),now.toLocalTime());

            // 5분 10초 지난 매치된 유저 요청은 삭제
            if(diff.getSeconds()>=310) {
                queueList.getCANCEL().remove(matchingRequestDto.getKakaoId()+matchingRequestDto.getStartWaitingTime());
            }
        }
    }
}
