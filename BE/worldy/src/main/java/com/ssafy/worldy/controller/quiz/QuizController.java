package com.ssafy.worldy.controller.quiz;

import com.ssafy.worldy.model.quiz.dto.NewsQuizDto;
import com.ssafy.worldy.model.quiz.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quiz")
public class QuizController {

    private final QuizService quizService;

    /***
     * [ 나라별 뉴스 퀴즈 ]
     * - 해당 나라의 뉴스 퀴즈를 랜덤으로 응답
     ***/
    @GetMapping("/news/{nation_id}")
    public ResponseEntity<NewsQuizDto> getNewsQuiz(@PathVariable Long nation_id){
        return new ResponseEntity<>(quizService.getNewsQuiz(nation_id), HttpStatus.OK);
    }
}
