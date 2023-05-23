package com.ssafy.worldy.controller.api;

import com.ssafy.worldy.model.quiz.dto.OpenAPIQuizDto;
import com.ssafy.worldy.model.quiz.service.QuizService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/get")
@RequiredArgsConstructor
@Slf4j
public class OpenAPIController {
    private final QuizService quizService;

    @GetMapping("/quiz")
    public ResponseEntity<OpenAPIQuizDto> getHiddenCatch(@RequestParam("nationId") String nationId, @RequestParam("quizType") String quizType,
                                                         @RequestParam("category") String category){

        OpenAPIQuizDto openAPIQuizDto = quizService.getOpenAPIQuizDto(Long.parseLong(nationId), quizType, category);
        return new ResponseEntity<>(openAPIQuizDto, HttpStatus.OK);
    }
}
