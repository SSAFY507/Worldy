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

    @GetMapping("/kakao/login")
    public ResponseEntity<KakaoLoginDto> kakaoLogin(@RequestParam String code) throws JsonProcessingException {

        KakaoLoginDto kakaoLoginDto = kakaoUserService.kakaoLogin(code);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + kakaoLoginDto.getTokenDto().getAccessToken());

        return new ResponseEntity<>(kakaoLoginDto, httpHeaders, HttpStatus.OK);
    }
}