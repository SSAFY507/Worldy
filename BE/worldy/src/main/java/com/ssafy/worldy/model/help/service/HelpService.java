package com.ssafy.worldy.model.help.service;

import com.ssafy.worldy.model.help.dto.HelpCreateDto;
import com.ssafy.worldy.model.help.dto.HelpDto;
import com.ssafy.worldy.model.help.repo.HelpRepo;
import com.ssafy.worldy.model.user.dto.UserDto;
import com.ssafy.worldy.model.user.service.KakaoUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HelpService {

    @Autowired
    KakaoUserService kakaoUserService;

    @Autowired
    HelpRepo helpRepo;

    // 문의 글 작성
    public String createHelp(HelpCreateDto helpCreateDto, String kakaoId) {

        UserDto userDto = kakaoUserService.getUserDto(kakaoId);
        HelpDto helpDto = new HelpDto(helpCreateDto, userDto);

        helpRepo.save(helpDto.toEntity());
        return "success";
    }
}
