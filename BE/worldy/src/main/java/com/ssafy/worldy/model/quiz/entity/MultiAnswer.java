package com.ssafy.worldy.model.quiz.entity;

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
@Table(name = "multi_answer")
public class MultiAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "multi_answer_id", nullable = false)
    private Long multiAnswerId; // auto_increment PK

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @Column(name = "answer", nullable = false)
    private String answer;

    @Column(name = "num", nullable = false)
    private int num;
}
