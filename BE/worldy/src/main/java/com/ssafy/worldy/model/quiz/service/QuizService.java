package com.ssafy.worldy.model.quiz.service;

import com.ssafy.worldy.model.quiz.dto.NewsQuizDto;
import com.ssafy.worldy.model.quiz.entity.Quiz;
import com.ssafy.worldy.model.quiz.repo.QuizRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class QuizService {
    private final QuizRepo quizRepo;

    public NewsQuizDto getNewsQuiz(Long nation_id){
        List<Quiz> newsQuizList = quizRepo.findAllNewsQuizByNationId(nation_id);
        int size = newsQuizList.size();

        Random random = new Random();
        Quiz newsQuiz = newsQuizList.get(random.nextInt(size));

        return newsQuiz.toNewsQuizDto();
    }
}
