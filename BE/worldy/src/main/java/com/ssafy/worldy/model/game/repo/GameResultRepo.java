package com.ssafy.worldy.model.game.repo;

import com.ssafy.worldy.model.adventure.entity.Nation;
import com.ssafy.worldy.model.game.entity.GameResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameResultRepo extends JpaRepository<GameResult, Long> {

    @Query(value = "select * from game_result where nation_id = ?1",nativeQuery = true)
    Optional<GameResult> findByNationId(Long nationId);

    @Modifying
    @Query(value = "update game_result set first = first + 1 where nation_id=?1",nativeQuery = true)
    void updateFirst(Long nationId);

    @Modifying
    @Query(value = "update game_result set second = second + 1 where nation_id=?1",nativeQuery = true)
    void updateSecond(Long nationId);

    @Modifying
    @Query(value = "update game_result set third = third + 1 where nation_id=?1",nativeQuery = true)
    void updateThird(Long nationId);

    @Modifying
    @Query(value = "update game_result set fourth = fourth + 1 where nation_id=?1",nativeQuery = true)
    void updateFourth(Long nationId);
}
