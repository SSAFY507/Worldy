package com.ssafy.worldy.controller.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.worldy.jwt.JwtFilter;
import com.ssafy.worldy.jwt.TokenProvider;
import com.ssafy.worldy.model.user.dto.KakaoLoginDto;
import com.ssafy.worldy.model.user.service.KakaoUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private KakaoUserService kakaoUserService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public UserController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    /***
     * [ 카카오 소셜 로그인 ]
     * - 카카오 인가 코드 받아온 후, 인가 코드를 이용해서 access 토큰을 받아와 사용자 정보 요청하기
     * - 카카오에서 받은 사용자 정보를 토대로 회원 가입 or 로그인 (이미 가입된 사용자일 경우 로그인, 아니면 회원가입)
     * - access, refresh 토큰 발급하고 refresh 토큰 저장
     ***/
    @GetMapping("/kakao/login")
    public ResponseEntity<KakaoLoginDto> kakaoLogin(@RequestParam String code) throws JsonProcessingException {

        KakaoLoginDto kakaoLoginDto = kakaoUserService.kakaoLogin(code);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + kakaoLoginDto.getTokenDto().getAccessToken());

        return new ResponseEntity<>(kakaoLoginDto, httpHeaders, HttpStatus.OK);
    }
}