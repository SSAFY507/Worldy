package com.ssafy.worldy.model.quiz.repo;

import com.ssafy.worldy.model.quiz.entity.HiddenCatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HiddenCatchRepo extends JpaRepository<HiddenCatch, Long> {
    @Query(value = "select * from hidden_catch where nation_id = ?1 and img_num = ?2", nativeQuery = true)
    HiddenCatch findHiddenCatchByNationIdAndImgNum(Long nationId, int imgNum);
}
