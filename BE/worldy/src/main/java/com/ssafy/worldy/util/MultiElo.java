package com.ssafy.worldy.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Slf4j
public class MultiElo {
    private final Double D = 400.0;
    private final Double K = 48.0;
    private final Double N = 4.0; // 멀티플레이어 수
    private final Double BASE = 2.0; // 멀티플레이어 수
    private Double E[]; // 멀티플레이에서 사용되는 예상 점수
    private Double S[]; // 멀티플레이에서 사용되는 게임 실제 결과
    private Double newMMR[];

    public Double[] getMultiElo(Double[] beforeMMR) {

        E = new Double[4];
        S = new Double[4];
        newMMR = new Double[4];

        // 예상 점수
        E = getExpectedScores(beforeMMR);

        // 실제 점수 (지수 함수 기반)
        S = getActualScores();

        // 갱신된 레이팅 점수
        newMMR = getNewRatings(beforeMMR);


        return newMMR;
    }

    // 갱신된 레이팅 점수
    private Double[] getNewRatings(Double[] beforeMMR) {

        Double[] newMMR = new Double[4];

        for(int a=0;a<4;a++) {
            newMMR[a] = beforeMMR[a] + K*(N-1)*(S[a] - E[a]);
        }

        log.info("newMMR " + Arrays.toString(newMMR));
        return newMMR;
    }

    // 실제 점수 (지수 함수 기반)
    private Double[] getActualScores() {

        Double[] S = new Double[4];

        Double denominator = 0.0; // 분모
        for(int i=1;i<=4;i++) {
            denominator += Math.pow(BASE, N-i) -1;
        }

        for(int p=1;p<=4;p++) {
            Double numerator = Math.pow(BASE, N-p) -1; // 분자
            S[p-1] = numerator/denominator;
        }

        log.info("getActualScores " + Arrays.toString(S));
        return S;
    }

    // 예상 점수
    private Double[] getExpectedScores(Double[] beforeMMR) {

        Double[] E = new Double[4];

        Double denominator = (N*(N-1))/2; // 분모

        for(int a=0;a<4;a++) {
            Double numerator = 0.0; // 분자
            for(int b=0;b<4;b++) {

                // 자신 제외
                if(a==b) continue;

                numerator+= 1/(1+Math.pow(10, (beforeMMR[b]-beforeMMR[a])/D));
            }

            E[a] = numerator/denominator;
        }

        log.info("getExpectedScores " + Arrays.toString(E));
        return E;
    }
}
