package com.ssafy.worldy.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ExceptionResponse {

    private final String code; // 에러 코드

    private final String message; // 에러 메시지

    @Builder
    public ExceptionResponse(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
