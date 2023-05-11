package com.ssafy.worldy.model.quiz.service;

import com.ssafy.worldy.model.adventure.entity.Nation;
import com.ssafy.worldy.model.adventure.repo.NationRepo;
import com.ssafy.worldy.model.quiz.dto.*;
import com.ssafy.worldy.model.quiz.entity.Quiz;
import com.ssafy.worldy.model.quiz.entity.QuizRecord;
import com.ssafy.worldy.model.quiz.repo.QuizLikeRepo;
import com.ssafy.worldy.model.quiz.repo.QuizRecordRepo;
import com.ssafy.worldy.model.quiz.repo.QuizRepo;
import com.ssafy.worldy.model.user.entity.User;
import com.ssafy.worldy.model.user.repo.UserRepo;
import com.ssafy.worldy.util.FastAPIUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepo quizRepo;
    private final NationRepo nationRepo;
    private final UserRepo userRepo;
    private final QuizRecordRepo quizRecordRepo;
    private final QuizLikeRepo quizLikeRepo;
    @Value("${fastapi.hidden-catch.url}")
    private String requestUrl;

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

    public void insertQuizRecord(QuizRecordInsertDto quizRecordInsertDto){

        Quiz quiz = quizRepo.findById(quizRecordInsertDto.getQuizId()).get();
        User user = userRepo.findById(quizRecordInsertDto.getUserId()).get();

        int point = 0;

        if(quiz.getLevel() == 3) point = 25;
        else if(quiz.getLevel() == 2) point = 20;
        else if(quiz.getLevel() == 1) point = 15;

        user.updateExp(point);

        quizRecordRepo.save(quizRecordInsertDto.toEntity(user, quiz));
    }

    public HiddenCatchDto getHiddenCatch(Long nationId){

        FastAPIUtil fastAPIUtil = new FastAPIUtil();

        JSONObject result = fastAPIUtil.getRequestFastAPI(requestUrl+nationId);

        String originalUrl = result.get("original_url").toString();
        String diffUrl = result.get("diff_url").toString();
        String imgNum = result.get("img_num").toString();
        List<List<String>> answerPointList = new ArrayList<>();

        List<String> answerPoints = new ArrayList<>();
        String[] answerPointsString = result.get("answerPoints").toString().replaceAll("\\[", "").split("],");
        answerPointsString[answerPointsString.length - 1] =  answerPointsString[answerPointsString.length - 1].replaceAll("\\]", "");

        answerPoints.addAll(Arrays.asList(answerPointsString));

        for(String str : answerPoints){
            List<String> list = new ArrayList<>();
            String[] strList = str.split(",");

            list.addAll(Arrays.asList(strList));
            answerPointList.add(list);
        }

        return HiddenCatchDto.builder()
                .originalUrl(originalUrl)
                .diffUrl(diffUrl)
                .imgNum(imgNum)
                .answerPointList(answerPointList)
                .build();
    }
}
