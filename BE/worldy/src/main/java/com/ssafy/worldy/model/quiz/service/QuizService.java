package com.ssafy.worldy.model.quiz.service;

import com.ssafy.worldy.model.quiz.entity.HiddenCatch;
import com.ssafy.worldy.model.adventure.entity.Nation;
import com.ssafy.worldy.model.adventure.repo.NationRepo;
import com.ssafy.worldy.model.quiz.dto.*;
import com.ssafy.worldy.model.quiz.entity.MultiAnswer;
import com.ssafy.worldy.model.quiz.entity.Quiz;
import com.ssafy.worldy.model.quiz.entity.QuizRecord;
import com.ssafy.worldy.model.quiz.repo.*;
import com.ssafy.worldy.model.user.entity.User;
import com.ssafy.worldy.model.user.repo.UserRepo;
import com.ssafy.worldy.util.FastAPIUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final HiddenCatchRepo hiddenCatchRepo;
    private final MultiAnswerRepo multiAnswerRepo;
    @Value("${fastapi.hidden-catch.url}")
    private String requestUrl;

    public NewsQuizDto getNewsQuiz(Long nationId){

        Quiz newsQuiz = quizRepo.findAllNewsQuizByNationId(nationId);
        return newsQuiz.toNewsQuizDto();
    }

    public List<QuizDto> getNationQuizDto(Long nationId){

        // 퀴즈를 고르는 기준이 필요! 지금은 그냥 랜덤으로
        Quiz quiz = quizRepo.findRandQuizByNationId(nationId);

        List<MultiAnswerDto> multiAnswerList = null;

        // 퀴즈 타입이 객관식이면 객관식 보기 조회
        if(quiz.getQuizType().equals("multi")) {
            multiAnswerList = new ArrayList<>();

            List<MultiAnswer> multiAnswers = multiAnswerRepo.findByQuiz(quiz);
            for (MultiAnswer multiAnswer : multiAnswers) {
                multiAnswerList.add(multiAnswer.toMultiAnswerDto());
            }
        }

        QuizDto quizDto = quiz.toDto();
        quizDto.setMultiAnswerList(multiAnswerList);

        log.info("==================================================");
        log.info(quizDto.toString());

        List<QuizDto> quizDtoList = new ArrayList<>();
        quizDtoList.add(quizDto);

        return quizDtoList;
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

    @Transactional
    public void insertQuizRecord(QuizRecordInsertDto quizRecordInsertDto){

        log.info(quizRecordInsertDto.toString());
        Quiz quiz = quizRepo.findById(quizRecordInsertDto.getQuizId()).get();
        User user = userRepo.findByNickName(quizRecordInsertDto.getUserNickName()).get();

        int point = 0;

        if(quiz.getLevel() == 3) point = 25;
        else if(quiz.getLevel() == 2) point = 20;
        else if(quiz.getLevel() == 1) point = 15;

        user.updateExp(point);

        quizRecordRepo.save(quizRecordInsertDto.toEntity(user, quiz));
        log.info(quizRecordInsertDto.toString());

        log.info("======================");

        //만약 스크랩을 했다면
        if(quizRecordInsertDto.isScrap()) {
            Long nationId = quiz.getNation().getNationId();

            QuizLikeInsertDto quizLikeInsertDto = QuizLikeInsertDto.builder()
                    .quizId(quiz.getQuizId())
                    .userId(user.getUserId())
                    .nationId(nationId)
                    .build();

            QuizRecord quizRecord = quizRecordRepo.findByQuizIdAndUserId(quiz.getQuizId(), user.getUserId()).get();
            Nation nation = nationRepo.findById(quizLikeInsertDto.getNationId()).get();

            log.info(quizLikeInsertDto.toString());
            quizLikeRepo.save(quizLikeInsertDto.toEntity(quiz, user, quizRecord, nation));
        }
    }

    public HiddenCatchDto getHiddenCatch(Long nationId){

        // FastAPI 에게 틀린 그림 찾기 제작 요청
        FastAPIUtil fastAPIUtil = new FastAPIUtil();

        JSONObject result = fastAPIUtil.getRequestFastAPI(requestUrl+nationId);

        String originalUrl = result.get("original_url").toString();
        String diffUrl = result.get("diff_url").toString();
        int imgNum = Integer.parseInt(result.get("img_num").toString());
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

        // Mysql 에서 그림 정보 가져오기
        HiddenCatch hiddenCatch = hiddenCatchRepo.findHiddenCatchByNationIdAndImgNum(nationId, imgNum);

        return HiddenCatchDto.builder()
                .originalUrl(originalUrl)
                .diffUrl(diffUrl)
                .imgNum(imgNum)
                .answerPointList(answerPointList)
                .imgTitle(hiddenCatch.getImgTitle())
                .imgSubTitle(hiddenCatch.getImgSubTitle())
                .imgContent(hiddenCatch.getImgContent())
                .build();
    }

    public void successHiddenCatch(String userNickName){

        User user = userRepo.findByNickName(userNickName).get();
        user.updateExp(20);

        userRepo.save(user);
    }

    public OpenAPIQuizDto getOpenAPIQuizDto(Long nationId, String quizType, String category){

        Quiz quiz = quizRepo.findQuizByNationIdAndQUizTypeAndCategory(nationId, quizType, category);

        log.info(nationId + " " + quizType + " " + category);

        String strQuizType = "";
        String strCategory = "";

        if(quizType.equals("ox")) strQuizType = "OX";
        else if(quizType.equals("blank")) strQuizType = "빈칸 문제";
        else strQuizType = "객관식";

        if(category.equals("cul")) strCategory = "문화/역사";
        else if(category.equals("aff")) strCategory = "시사/상식";
        else strCategory = "기타";

        log.info(strQuizType + " " + strCategory);

        List<OpenAPIMultiAnswerDto> multiAnswerList = null;

        // 퀴즈 타입이 객관식이면 객관식 보기 조회
        if(quiz.getQuizType().equals("multi")) {
            multiAnswerList = new ArrayList<>();

            List<MultiAnswer> multiAnswers = multiAnswerRepo.findByQuiz(quiz);
            for (MultiAnswer multiAnswer : multiAnswers) {
                multiAnswerList.add(multiAnswer.toOpenAPIMultiAnswerDto());
            }
        }

        return OpenAPIQuizDto.builder()
                .nation(quiz.getNation().getNationName())
                .quizType(strQuizType)
                .category(strCategory)
                .level(quiz.getLevel())
                .image(quiz.getImage())
                .content(quiz.getContent())
                .answer(quiz.getAnswer())
                .hint(quiz.getHint())
                .commentary(quiz.getCommentary())
                .multiAnswerList(multiAnswerList)
                .build();
    }
}
