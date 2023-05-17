package com.ssafy.worldy.controller.quiz;

import com.ssafy.worldy.model.quiz.dto.*;
import com.ssafy.worldy.model.quiz.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quiz")
public class QuizController {

    private final QuizService quizService;

    /***
     * [ 나라별 뉴스 퀴즈 ]
     * - 해당 나라의 뉴스 퀴즈를 랜덤으로 응답
     ***/
    @GetMapping("/news/{nationId}")
    public ResponseEntity<NewsQuizDto> getNewsQuiz(@PathVariable Long nationId){

        return new ResponseEntity<>(quizService.getNewsQuiz(nationId), HttpStatus.OK);
    }

    /***
     * [ 나라별 퀴즈 ]
     * - 해당 나라의 퀴즈를 랜덤으로 응답
     ***/
    @GetMapping("/nation/{nationId}")
    public ResponseEntity<QuizDto> getNationQuiz(@PathVariable Long nationId){

        return new ResponseEntity<>(quizService.getNationQuizDto(nationId), HttpStatus.OK);
    }

    /***
     * [ 나라별 퀴즈 등록 ]
     * - 해당 나라의 퀴즈를 유저가 적접 등록
     ***/
    @PostMapping("/insert")
    public ResponseEntity<String> insertNationQuiz(@RequestBody QuizInsertDto quizInsertDto){

        quizService.insertQuiz(quizInsertDto);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    /***
     * [ 퀴즈 찜 ]
     * - 유저가 원하는 퀴즈를 찜
     ***/
    @PostMapping("/like")
    public ResponseEntity<String> insertQuizLike(@RequestBody QuizLikeInsertDto quizLikeInsertDto){

        quizService.insertQuizLike(quizLikeInsertDto);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    /***
     * [ 퀴즈 결과 ]
     * - 유저가 푼 퀴즈의 결과 저장
     ***/
    @PostMapping("/record")
    public ResponseEntity<String> insertQuizRecord(@RequestBody QuizRecordInsertDto quizRecordInsertDto){

        quizService.insertQuizRecord(quizRecordInsertDto);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    /***
     * [ 틀린 그림 찾기 ]
     * - 나라별 랜드마크 사진으로 틀린 그림 찾기
     ***/
    @GetMapping("/hidden/{nationId}")
    public ResponseEntity<HiddenCatchDto> getHiddenCatch(@PathVariable Long nationId){

        HiddenCatchDto hiddenCatchDto = quizService.getHiddenCatch(nationId);
        return new ResponseEntity<>(hiddenCatchDto, HttpStatus.OK);
    }

    /***
     * [ 틀린 그림 찾기 성공 ]
     * - 틀린 그림 찾기  성공시 경험치 20점 제공
     ***/
    @PostMapping("/hidden/success")
    public ResponseEntity<String> getHiddenCatch(@RequestBody Map<String, Long> user){

        quizService.successHiddenCatch(user.get("userId"));
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
