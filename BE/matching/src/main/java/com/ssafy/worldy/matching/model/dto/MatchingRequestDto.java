package com.ssafy.worldy.matching.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

/**
 * 직렬화 - 역직렬화 시에 serialVersionUID를 키로 객체의 호환을 따짐
 * producer에서 보내는 MatchingRequestDto의 객체가 맞는지 확인하기 위해 serialVersionUID가 필요함
 **/
@ToString
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor

public class MatchingRequestDto implements Serializable, Comparable<MatchingRequestDto> {

    private static final long serialVersionUID = 6529685098267757690L;
    private String kakaoId;
    private String roomId;
    private int mmr;
    private int level;
    private String startWaitingTime;

    @Override
    public int compareTo(MatchingRequestDto o) {
        LocalDate date1 = LocalDate.parse(this.startWaitingTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        LocalDate date2 = LocalDate.parse(o.startWaitingTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        return date1.compareTo(date2);
    }
}