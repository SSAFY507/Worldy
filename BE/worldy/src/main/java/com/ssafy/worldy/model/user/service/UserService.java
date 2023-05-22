package com.ssafy.worldy.model.user.service;

import com.ssafy.worldy.exception.CustomException;
import com.ssafy.worldy.exception.CustomExceptionList;
import com.ssafy.worldy.model.user.dto.UserDto;
import com.ssafy.worldy.model.user.entity.User;
import com.ssafy.worldy.model.user.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    KakaoUserService kakaoUserService;

    // 닉네임 중복 검사
    public boolean checkNickName(String nickName) {

        Optional<User> user = userRepo.findByNickName(nickName);
        if(user.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    // 닉네임 등록
    public String submitNickName(String nickName, String kakaoId) {

        Optional<User> user = userRepo.findByNickName(nickName);
        if(user.isPresent()) {
            throw new CustomException(CustomExceptionList.NICKNAME_ALREADY_USED);
        }

        User user1 = userRepo.findByNickName(kakaoId).orElseThrow(()->new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));
        user1.updateNickName(nickName);

//        UserDto userDto = kakaoUserService.getUserDto(kakaoId);
//        userDto.setNickName(nickName);
//        userRepo.save(userDto.toEntity());

        return "success";
    }
}
