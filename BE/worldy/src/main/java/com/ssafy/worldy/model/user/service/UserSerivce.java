package com.ssafy.worldy.model.user.service;

import com.ssafy.worldy.model.user.dto.AuthorityDto;
import com.ssafy.worldy.model.user.dto.UserDto;
import com.ssafy.worldy.model.user.entity.User;
import com.ssafy.worldy.model.user.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserSerivce {

    private static final String ROLE_USER = "ROLE_USER";

    @Autowired
    private UserRepo userRepo;

//    @Autowired
//    private UserAuthorityRepo userAuthorityRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // refresh 토큰 업데이트
    @Transactional
    public void saveRefreshToken(String kakaoId, String refreshToken) {

        Optional<User> user = userRepo.findByKakaoId(kakaoId);
        if(user.isEmpty()) {
            throw new RuntimeException("없는 회원");
        }

        UserDto userDto = user.get().toDto();
        userDto.setRefreshToken(refreshToken);
        userRepo.save(userDto.toEntity());
    }

//    // 회원 가입
//    @Transactional
//    public String regist(UserDto userDto) {
//
//        // 가입하려는 사용자의 kakaoId
//        String kakaoId = userDto.getKakaoId();
//
//        Optional<User> user = userRepo.findByKakaoId(userDto.getKakaoId());
//        if(user.isPresent()) {
//            throw new RuntimeException("이미 있는 회원 -> 회원 가입 실패");
//        }
//
//        userDto.setPassword(passwordEncoder.encode(userDto.getPassword())); // 비밀번호 암호화
//
//        // 사용자 기본 저장
//        userRepo.save(userDto.toEntity());
//
//        // 사용자 권한 정보 저장
//        Optional<User> nowUser = userRepo.findByKakaoId(userDto.getKakaoId());
//        UserAuthorityDto userAuthorityDto = new UserAuthorityDto();
//        userAuthorityDto.setUserDto(nowUser.get().toDto());
//        userAuthorityDto.setAuthorityDto(new AuthorityDto(ROLE_USER));
//        userAuthorityRepo.save(userAuthorityDto.toEntity());
//
//        return userDto.getKakaoId() + " 사용자 가입 완료";
//    }
}
