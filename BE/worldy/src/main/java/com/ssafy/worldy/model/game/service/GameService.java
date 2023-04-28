package com.ssafy.worldy.model.game.service;

import com.ssafy.worldy.exception.CustomException;
import com.ssafy.worldy.exception.CustomExceptionList;
import com.ssafy.worldy.model.adventure.entity.Nation;
import com.ssafy.worldy.model.adventure.repo.NationRepo;
import com.ssafy.worldy.model.game.dto.GameResultDto;
import com.ssafy.worldy.model.game.entity.GameResult;
import com.ssafy.worldy.model.game.repo.GameResultRepo;
import com.ssafy.worldy.model.user.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class GameService {

    private final GameResultRepo gameResultRepo;
    private final NationRepo nationRepo;
    private final UserRepo userRepo;

    @Transactional
    public void gameResult(GameResultDto gameResultDto) {

        // 1등 나라 정보 갱신
        for (Long nationId : gameResultDto.getFirst()) saveResult(nationId, 1);

        // 2등 나라 정보 갱신
        for (Long nationId : gameResultDto.getSecond()) saveResult(nationId, 2);

        // 3등 나라 정보 갱신
        for (Long nationId : gameResultDto.getThird()) saveResult(nationId, 3);

        // 4등 나라 정보 갱신
        for (Long nationId : gameResultDto.getFourth()) saveResult(nationId, 4);
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
}
