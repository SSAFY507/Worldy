package com.ssafy.worldy.model.quiz.service;

import com.ssafy.worldy.model.adventure.entity.Nation;
import com.ssafy.worldy.model.adventure.repo.NationRepo;
import com.ssafy.worldy.model.quiz.dto.NewsQuizDto;
import com.ssafy.worldy.model.quiz.dto.QuizDto;
import com.ssafy.worldy.model.quiz.dto.QuizInsertDto;
import com.ssafy.worldy.model.quiz.dto.QuizLikeInsertDto;
import com.ssafy.worldy.model.quiz.entity.Quiz;
import com.ssafy.worldy.model.quiz.entity.QuizRecord;
import com.ssafy.worldy.model.quiz.repo.QuizLikeRepo;
import com.ssafy.worldy.model.quiz.repo.QuizRecordRepo;
import com.ssafy.worldy.model.quiz.repo.QuizRepo;
import com.ssafy.worldy.model.user.entity.User;
import com.ssafy.worldy.model.user.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepo quizRepo;
    private final NationRepo nationRepo;
    private final UserRepo userRepo;
    private final QuizRecordRepo quizRecordRepo;
    private final QuizLikeRepo quizLikeRepo;

    public NewsQuizDto getNewsQuiz(Long nationId){

        Quiz newsQuiz = quizRepo.findAllNewsQuizByNationId(nationId);
        return newsQuiz.toNewsQuizDto();
    }

    public QuizDto getNationQuizDto(Long nationId){

        // 퀴즈를 고르는 기준이 필요! 지금은 그냥 랜덤으로
        Quiz quiz = quizRepo.findRandQuizByNationId(nationId);
        return quiz.toDto();
    }

    public void insertQuiz(QuizInsertDto quizInsertDto){

        Nation nation = nationRepo.findByNationName(quizInsertDto.getNationName()).get();
        Quiz quiz = quizInsertDto.toEntity(nation);

        quizRepo.save(quiz);
    }

    public void insertQuizLike(QuizLikeInsertDto quizLikeInsertDto){

        Quiz quiz = quizRepo.findById(quizLikeInsertDto.getQuizId()).get();
        User user = userRepo.findById(quizLikeInsertDto.getUserId()).get();
        QuizRecord quizRecord = quizRecordRepo.findByQuizIdAndUserId(quiz.getQuizId(), user.getUserId()).get();
        Nation nation = nationRepo.findById(quizLikeInsertDto.getNationId()).get();

        quizLikeRepo.save(quizLikeInsertDto.toEntity(quiz,user,quizRecord,nation));
    }
}
