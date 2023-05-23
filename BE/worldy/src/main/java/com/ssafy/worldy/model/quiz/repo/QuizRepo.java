package com.ssafy.worldy.model.quiz.repo;

import com.ssafy.worldy.model.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepo extends JpaRepository<Quiz, Long> {

    @Query(value = "select * from quiz where nation_id = ?1 and publisher_type = 'gpt' order by RAND() limit 1;", nativeQuery = true)
    Quiz findAllNewsQuizByNationId(Long nationId);

    @Query(value = "select * from quiz where nation_id = ?1 and publisher_type != 'gpt' order by RAND() limit 1;", nativeQuery = true)
    Quiz findRandQuizByNationId(Long nationId);

    @Query(value = "select * from quiz where nation_id = ?1 and quiz_type = ?2 and category = ?3 order by RAND() limit 1;", nativeQuery = true)
    Quiz findQuizByNationIdAndQUizTypeAndCategory(Long nationId, String quizType, String category);

    @Query(value = "select * from quiz where quiz_id = ?1;", nativeQuery = true)
    Quiz findAllNewsQuizByQuizId(Long quizId);
}
