package com.ssafy.worldy.controller.help;

import com.ssafy.worldy.model.help.dto.HelpCreateDto;
import com.ssafy.worldy.model.help.dto.HelpDto;
import com.ssafy.worldy.model.help.dto.HelpResponseDto;
import com.ssafy.worldy.model.help.service.HelpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/help")
public class HelpController {

    @Autowired
    HelpService helpService;

    /***
     * [ 문의 글 작성 ]
     * - 문의 글 저장
     * - 글 작성 시간 자동 저장
     * - ElasticSearch 에 데이터 추가
     ***/
    @PostMapping("/write")
    public ResponseEntity<String> writeHelp(@RequestBody HelpCreateDto helpCreateDto) {

        String kakaoId = SecurityContextHolder.getContext().getAuthentication().getName();
        helpService.createHelp(helpCreateDto, kakaoId);

        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    /***
     * [ 모든 글 조회 ]
     * - 모든 문의 글 조회
     ***/
    @GetMapping("/all")
    public ResponseEntity<List<HelpResponseDto>> getAllHelp() {

        return new ResponseEntity<>(helpService.getAllHelp(), HttpStatus.OK);
    }
}
