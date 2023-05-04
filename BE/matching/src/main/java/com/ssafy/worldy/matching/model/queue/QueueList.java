package com.ssafy.worldy.matching.model.queue;

import com.ssafy.worldy.matching.model.dto.MatchingRequestDto;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@Getter
public class QueueList {
    public QueueList() {
        queueList.add(this.BRONZE2);
        queueList.add(this.BRONZE1);
        queueList.add(this.SILVER2);
        queueList.add(this.SILVER1);
        queueList.add(this.GOLD2);
        queueList.add(this.GOLD1);
        queueList.add(this.PLATINUM2);
        queueList.add(this.PLATINUM1);
        queueList.add(this.BRONZE);
        queueList.add(this.SILVER);
        queueList.add(this.GOLD);
        queueList.add(this.PLATINUM);
        queueList.add(this.BRONZE_SILVER);
        queueList.add(this.SILVER_GOLD);
        queueList.add(this.GOLD_PLATINUM);
        queueList.add(this.BRONZE_SILVER_GOLD);
        queueList.add(this.SILVER_GOLD_PLATINUM);
        queueList.add(this.ALL);
    }
    final List<PriorityQueue<MatchingRequestDto>> queueList = new ArrayList<>();
    final PriorityQueue<MatchingRequestDto> BRONZE2 = new PriorityQueue<>();
    final PriorityQueue<MatchingRequestDto> BRONZE1 = new PriorityQueue<>();
    final PriorityQueue<MatchingRequestDto> SILVER2 = new PriorityQueue<>();
    final PriorityQueue<MatchingRequestDto> SILVER1 = new PriorityQueue<>();
    final PriorityQueue<MatchingRequestDto> GOLD2 = new PriorityQueue<>();
    final PriorityQueue<MatchingRequestDto> GOLD1 = new PriorityQueue<>();
    final PriorityQueue<MatchingRequestDto> PLATINUM2 = new PriorityQueue<>();
    final PriorityQueue<MatchingRequestDto> PLATINUM1 = new PriorityQueue<>();
    final PriorityQueue<MatchingRequestDto> BRONZE = new PriorityQueue<>();
    final PriorityQueue<MatchingRequestDto> SILVER = new PriorityQueue<>();
    final PriorityQueue<MatchingRequestDto> GOLD = new PriorityQueue<>();
    final PriorityQueue<MatchingRequestDto> PLATINUM = new PriorityQueue<>();
    final PriorityQueue<MatchingRequestDto> BRONZE_SILVER = new PriorityQueue<>(); //13
    final PriorityQueue<MatchingRequestDto> SILVER_GOLD = new PriorityQueue<>(); //14
    final PriorityQueue<MatchingRequestDto> GOLD_PLATINUM = new PriorityQueue<>(); //15
    final PriorityQueue<MatchingRequestDto> BRONZE_SILVER_GOLD = new PriorityQueue<>(); //16
    final PriorityQueue<MatchingRequestDto> SILVER_GOLD_PLATINUM  = new PriorityQueue<>(); // 17
    final PriorityQueue<MatchingRequestDto> ALL = new PriorityQueue<>();
    final Map<String,MatchingRequestDto> CANCEL = new HashMap();
    final Map<String,MatchingRequestDto> MATCH = new HashMap();

}
