package com.ssafy.worldy.controller.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.worldy.jwt.JwtFilter;
import com.ssafy.worldy.jwt.TokenProvider;
import com.ssafy.worldy.model.user.dto.KakaoLoginDto;
import com.ssafy.worldy.model.user.dto.ScrapDto;
import com.ssafy.worldy.model.user.service.KakaoUserService;
import com.ssafy.worldy.model.user.service.UserQuizService;
import com.ssafy.worldy.model.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private KakaoUserService kakaoUserService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    private UserQuizService userQuizService;

    @Autowired
    private UserService userService;

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

    /***
     * [ 로그아웃 ]
     * - refresh 토큰을 null로 변경
     ***/
    @GetMapping("/logout")
    public ResponseEntity<String> logout() {

        String kakaoId = SecurityContextHolder.getContext().getAuthentication().getName();
        // kakaoUserService.logout(kakaoId);

        return new ResponseEntity<>("[kakaoId : " + kakaoId + "] logout success", HttpStatus.OK);
    }

    /***
     * [ 스크랩한 퀴즈 전체 조회 ]
     * - 스크랩한 퀴즈 정보에 대하여 필요한 내용만 조합한 ScrapDto 조회
     * - 퀴즈 정보 (QuizDto, MultiAnswerDto), 내가 입력한 퀴즈 답변에 대한 정보 (QuizRecordDto) 조합
     ***/
    @GetMapping("/scrap/all")
    public ResponseEntity<List<ScrapDto>> getAllScrap() {
        String kakaoId = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(userQuizService.getMyQuizLike(kakaoId), HttpStatus.OK);
    }

    /***
     * [ 닉네임 중복 확인 ]
     ***/
    @GetMapping("/check/{nickName}")
    public ResponseEntity<Boolean> checkNickName(@PathVariable String nickName) {
        return new ResponseEntity<>(userService.checkNickName(nickName), HttpStatus.OK);
    }

    /***
     * [ 닉네임 등록 ]
     ***/
    @PutMapping("/nickname/{nickName}")
    public ResponseEntity<String> submitNickName(@PathVariable String nickName) {
        String kakaoId = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(userService.submitNickName(nickName, kakaoId), HttpStatus.ACCEPTED);
    }
}