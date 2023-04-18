package com.ssafy.worldy.controller.user;

import com.ssafy.worldy.jwt.JwtFilter;
import com.ssafy.worldy.jwt.TokenProvider;
import com.ssafy.worldy.model.user.dto.LoginDto;
import com.ssafy.worldy.model.user.dto.TokenDto;
import com.ssafy.worldy.model.user.dto.UserDto;
import com.ssafy.worldy.model.user.service.UserSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserSerivce userSerivce;

    private final TokenProvider tokenProvider;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public UserController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    /***
     * [ 로그인 ]
     * access, refresh 토큰 발급 (refresh는 구현 예정)
     */
    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody LoginDto loginDto) {

        // username(kakaoId)과 password를 이용하여 인증을 진행
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getKakaoId(), loginDto.getPassword());

        // SecurityContextHolder에 저장
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // JWT 토큰 생성
        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
    }

    /***
     * [ 회원가입 ]
     * 가입, 권한 부여, 비밀번호 암호화
     ***/
    @PostMapping("/regist")
    public ResponseEntity<String> regist(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userSerivce.regist(userDto), HttpStatus.OK);
    }
}