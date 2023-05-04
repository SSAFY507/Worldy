package com.ssafy.worldy.model.user.service;

import com.ssafy.worldy.model.quiz.dto.MultiAnswerDto;
import com.ssafy.worldy.model.quiz.dto.QuizLikeDto;
import com.ssafy.worldy.model.quiz.entity.MultiAnswer;
import com.ssafy.worldy.model.quiz.entity.QuizLike;
import com.ssafy.worldy.model.quiz.repo.MultiAnswerRepo;
import com.ssafy.worldy.model.quiz.repo.QuizLikeRepo;
import com.ssafy.worldy.model.user.dto.ScrapDto;
import com.ssafy.worldy.model.user.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserQuizService {

    @Autowired
    QuizLikeRepo quizLikeRepo;

    @Autowired
    MultiAnswerRepo multiAnswerRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    KakaoUserService kakaoUserService;

    // 해당 유저의 찜 목록 조회
    public List<ScrapDto> getMyQuizLike(String kakaoId) {

        Long userId = kakaoUserService.getUserId(kakaoId);

        List<QuizLike> quizLikeList = quizLikeRepo.findByUserId(userId);
        List<QuizLikeDto> quizLikeDtoList = quizLikeList.stream().map(QuizLikeDto::new).collect(Collectors.toList());
        List<ScrapDto> scrapDtoList = quizLikeDtoList.stream().map(ScrapDto::new).collect(Collectors.toList());

        // 객관식 문항에 대해서 모든 선택지 가져오기
        for(ScrapDto scrapDto: scrapDtoList) {
            if(scrapDto.getQuizType().equals("multi")) {
                List<MultiAnswer> multiAnswerList = multiAnswerRepo.findByQuizId(scrapDto.getQuizId());
                List<MultiAnswerDto> multiAnswerDtoList = multiAnswerList.stream().map(MultiAnswerDto::new).collect(Collectors.toList());

                // 객관식 답안 지정
                for(MultiAnswerDto multiAnswerDto: multiAnswerDtoList) {
                    if(multiAnswerDto.getNum() == 1) {
                        scrapDto.setMultiFirst(multiAnswerDto.getAnswer());
                    } else if(multiAnswerDto.getNum() == 2) {
                        scrapDto.setMultiSecond(multiAnswerDto.getAnswer());
                    } else if(multiAnswerDto.getNum() == 3) {
                        scrapDto.setMultiThird(multiAnswerDto.getAnswer());
                    } else {
                        scrapDto.setMultiFourth(multiAnswerDto.getAnswer());
                    }
                }
            }
        }

        return scrapDtoList;
    }


}
