package com.ssafy.worldy.model.quiz.entity;

import com.ssafy.worldy.model.adventure.entity.Nation;
import com.ssafy.worldy.model.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "quiz_like")
public class QuizLike {

    @Id
    @GeneratedValue
    @Column(name = "quiz_like_id", nullable = false)
    private Long quizLikeId; // auto_increment PK

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz; // 퀴즈

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // 회원

    @ManyToOne
    @JoinColumn(name = "quiz_record_id")
    private QuizRecord quizRecord; // 퀴즈 풀이 기록

    @ManyToOne
    @JoinColumn(name = "nation_id")
    private Nation nation; // 나라
}
