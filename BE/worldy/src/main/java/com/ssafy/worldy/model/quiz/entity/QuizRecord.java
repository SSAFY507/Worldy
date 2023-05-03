package com.ssafy.worldy.model.quiz.entity;

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
@Table(name = "quiz_record")
public class QuizRecord {

    @Id
    @GeneratedValue
    @Column(name = "quiz_record_id", nullable = false)
    private Long quizRecordId; // auto_increment PK

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user; // 회원

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz; // 퀴즈

    private boolean success; // 풀이 성공 여부

    private String userAnswer; // 회원이 입력(선택)한 답안
}
