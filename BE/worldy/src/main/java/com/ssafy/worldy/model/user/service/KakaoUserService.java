package com.ssafy.worldy.model.user.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.worldy.exception.CustomException;
import com.ssafy.worldy.exception.CustomExceptionList;
import com.ssafy.worldy.jwt.TokenProvider;
import com.ssafy.worldy.model.user.dto.KakaoLoginDto;
import com.ssafy.worldy.model.user.dto.TokenDto;
import com.ssafy.worldy.model.user.dto.UserDto;
import com.ssafy.worldy.model.user.entity.Authority;
import com.ssafy.worldy.model.user.entity.User;
import com.ssafy.worldy.model.user.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class KakaoUserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final static String ROLE_USER = "ROLE_USER";

    @Value("${kakao.client.id}")
    private String clientId;

    @Transactional
    public KakaoLoginDto kakaoLogin(String code) throws JsonProcessingException {

        // 1. 인가코드로 access 토큰 요청
        //String accessToken = getAccessToken(code, "https://k8a507.p.ssafy.io/user/kakao/callback");
        String accessToken = getAccessToken(code, "http://localhost:3000/user/kakao/callback");

        // 2. 없는 회원의 경우 회원가입
        User user = registKakaoUser(accessToken);

        // 3. 로그인 JWT 토큰 발행
        TokenDto tokenDto = createToken(user);

        return new KakaoLoginDto(tokenDto, user.getKakaoId(), user.getProfileImg());
    }

    // access, refresh 토큰 발급 및 저장
    public TokenDto createToken(User user) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(user.getKakaoId(), user.getKakaoId());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = tokenProvider.createAccessToken(authentication);
        String refreshToken = tokenProvider.createRefreshToken();

        user.updateToken(refreshToken);

        return TokenDto.builder().accessToken(accessToken).refreshToken(refreshToken).build();
    }

    // Kakao code로 Kakao token 발급
    private String getAccessToken(String code, String redirectUri) throws JsonProcessingException {

        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("redirect_uri", redirectUri);
        body.add("code", code);

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // HTTP 응답 (JSON) -> 액세스 토큰 파싱
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        return jsonNode.get("access_token").asText();
    }

    // 처음 로그인 시 회원 가입
    public User registKakaoUser(String accessToken) throws JsonProcessingException {

        JsonNode jsonNode = getKakaoUserInfo(accessToken);

        // kakaoId 중복 확인
        String kakaoId = String.valueOf(jsonNode.get("id").asLong());
        User user = userRepo.findByKakaoId(kakaoId).orElse(null);

        // 회원가입
        if (user == null) {
            String age = null;
            String gender = null;

            // 연령
            if(jsonNode.get("kakao_account").has("age_range")) {
                age = jsonNode.get("kakao_account").get("age_range").asText();

                if(age.equals("10~19")) age = "10S";
                else if(age.equals("20~29")) age = "20S";
                else if (age.equals("30~39")) age = "30S";
                else if (age.equals("40~49")) age = "40S";
                else if (age.equals("50~59")) age = "50S";
                else if (age.equals("60~69")) age = "60S";
            }

            // 성별
            if(jsonNode.get("kakao_account").has("gender")) {
                gender = jsonNode.get("kakao_account").get("gender").asText();
            }

            // 비밀번호 암호화 (kakaoId를 암호화해서 비밀번호로 저장)
            String encodedPassword = passwordEncoder.encode(kakaoId);

            // 권한 부여
            Authority authority = Authority.builder()
                    .authorityName(ROLE_USER)
                    .build();

            user = User.builder()
                    .kakaoId(kakaoId)
                    .password(encodedPassword)
                    .age(age)
                    .sex(gender)
                    .activated(true)
                    .exp(0)
                    .level(0)
                    .mmr(1000)
                    .authorities(Collections.singleton(authority)).build();
        }

        // 프로필 이미지는 로그인 할 때마다 업데이트
        String profileImg = jsonNode.get("properties").get("profile_image").asText();
        user.setProfileImg(profileImg);

        userRepo.save(user);
        return user;
    }

    // kakao 토큰으로 동의 항목 가져오기
    private JsonNode getKakaoUserInfo(String accessToken) throws JsonProcessingException {

        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoUserInfoRequest,
                String.class
        );

        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readTree(responseBody);
    }

    // 로그아웃
    @Transactional
    public void logout(String kakaoId) {

        UserDto userDto = getUserDto(kakaoId);

        userDto.setRefreshToken(null);
        userRepo.save(userDto.toEntity());
    }

    // kakaoId로 UserDto 조회
    public UserDto getUserDto(String kakaoId) {

        Optional<User> user = userRepo.findByKakaoId(kakaoId);
        if(user.isEmpty()) {
            throw new CustomException(CustomExceptionList.MEMBER_NOT_FOUND);
        }
        return user.get().toDto();
    }

    // kakaoId로 userId 조회
    public Long getUserId(String kakaoId) {

        Optional<User> user = userRepo.findByKakaoId(kakaoId);
        if(user.isEmpty()) {
            throw new CustomException(CustomExceptionList.MEMBER_NOT_FOUND);
        }
        return user.get().toDto().getUserId();
    }
}
