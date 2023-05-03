package com.ssafy.worldy.model.adventure.repo;

import com.ssafy.worldy.model.adventure.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepo extends JpaRepository<News, Long> {
    @Query(value = "select * from news where nation_id = ?1", nativeQuery = true)
    List<News> findAllNewsByNationId(Long nationId);
}
