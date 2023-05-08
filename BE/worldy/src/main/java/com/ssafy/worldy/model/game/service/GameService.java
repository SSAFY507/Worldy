package com.ssafy.worldy.model.game.service;

import com.ssafy.worldy.exception.CustomException;
import com.ssafy.worldy.exception.CustomExceptionList;
import com.ssafy.worldy.model.adventure.entity.Nation;
import com.ssafy.worldy.model.adventure.repo.NationRepo;
import com.ssafy.worldy.model.game.dto.GameRankingDto;
import com.ssafy.worldy.model.game.dto.GameResultDto;
import com.ssafy.worldy.model.game.dto.RankUserDto;
import com.ssafy.worldy.model.game.entity.GameResult;
import com.ssafy.worldy.model.game.repo.GameResultRepo;
import com.ssafy.worldy.model.user.entity.User;
import com.ssafy.worldy.model.user.repo.UserRepo;
import com.ssafy.worldy.util.MultiElo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class GameService {

    private final GameResultRepo gameResultRepo;
    private final NationRepo nationRepo;
    private final UserRepo userRepo;
    private final MultiElo multiElo;

    @Transactional
    public void gameResult(GameResultDto gameResultDto) {

        // 1등 나라 정보 갱신
        for (Long nationId : gameResultDto.getFirst().getNationList()) saveResult(nationId, 1);

        // 2등 나라 정보 갱신
        for (Long nationId : gameResultDto.getSecond().getNationList()) saveResult(nationId, 2);

        // 3등 나라 정보 갱신
        for (Long nationId : gameResultDto.getThird().getNationList()) saveResult(nationId, 3);

        // 4등 나라 정보 갱신
        for (Long nationId : gameResultDto.getFourth().getNationList()) saveResult(nationId, 4);

        Double[] beforeMMR = new Double[4];

        User user1 = userRepo.findByKakaoId(gameResultDto.getFirst().getKakaoId()).orElseThrow(()-> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));
        User user2 = userRepo.findByKakaoId(gameResultDto.getSecond().getKakaoId()).orElseThrow(()-> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));
        User user3 = userRepo.findByKakaoId(gameResultDto.getThird().getKakaoId()).orElseThrow(()-> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));
        User user4 = userRepo.findByKakaoId(gameResultDto.getFourth().getKakaoId()).orElseThrow(()-> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));

        beforeMMR[0] = (double) user1.getMmr();
        beforeMMR[1] = (double) user2.getMmr();
        beforeMMR[2] = (double) user3.getMmr();
        beforeMMR[3] = (double) user4.getMmr();

        // mmr 계산
        Double[] newMMR = multiElo.getMultiElo(beforeMMR);

        // mmr 갱신
        user1.updateMmr((int) Math.round(newMMR[0]));
        user2.updateMmr((int) Math.round(newMMR[1]));
        user3.updateMmr((int) Math.round(newMMR[2]));
        user4.updateMmr((int) Math.round(newMMR[3]));

        // exp 갱신
        user1.updateExp(40);
        user2.updateExp(30);
        user3.updateExp(25);
        user4.updateExp(20);
    }

    public void saveResult(Long nationId, int rank) {
        GameResult gameResult = gameResultRepo.findByNationId(nationId).orElse(null);
        if(gameResult==null) {
            Nation nation = nationRepo.findByNationId(nationId).orElse(null);

            if (nation==null) {
                throw new CustomException(CustomExceptionList.NATION_NOT_FOUND);
            }

            // 나라에 대한 결과를 처음 저장할 경우
            if (rank == 1) {
                gameResult = GameResult.builder().nationId(nation).first(1).second(0).third(0).fourth(0).build();
            } else if (rank == 2) {
                gameResult = GameResult.builder().nationId(nation).first(0).second(1).third(0).fourth(0).build();
            } else if (rank == 3) {
                gameResult = GameResult.builder().nationId(nation).first(0).second(0).third(1).fourth(0).build();
            } else if (rank == 4) {
                gameResult = GameResult.builder().nationId(nation).first(0).second(0).third(0).fourth(1).build();
            }

            gameResultRepo.save(gameResult);

        } else { //
            if (rank == 1) {
                gameResultRepo.updateFirst(nationId);
            } else if (rank == 2) {
                gameResultRepo.updateSecond(nationId);
            } else if (rank == 3) {
                gameResultRepo.updateThird(nationId);
            } else if (rank == 4) {
                gameResultRepo.updateFourth(nationId);
            }
        }
    }

    @Transactional
    public GameRankingDto getRanking(String kakaoId) {

        User user = userRepo.findByKakaoId(kakaoId).orElseThrow(()->new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));
        int ranking = userRepo.findByMyRank(kakaoId);

        RankUserDto myRank = RankUserDto.builder().rank(ranking).user(user.toDto()).build();

        List<User> rankTop10User = userRepo.findByRankTop10User();

        List<RankUserDto> rankUserDtos = new ArrayList<>();
        for (int i=0;i<rankTop10User.size();i++) {
            RankUserDto rankUserDto = RankUserDto.builder().rank(i+1).user(rankTop10User.get(i).toDto()).build();
            rankUserDtos.add(rankUserDto);
        }


        return GameRankingDto.builder().myRank(myRank).rankTop10User(rankUserDtos).build();
    }
}
