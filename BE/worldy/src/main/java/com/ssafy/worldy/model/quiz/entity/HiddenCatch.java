package com.ssafy.worldy.model.quiz.entity;

import com.ssafy.worldy.model.adventure.entity.Nation;
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
@Table(name = "hidden_catch")
public class HiddenCatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hidden_catch_id", nullable = false)
    private Long hiddenCatchId;

    @ManyToOne
    @JoinColumn(name = "nation_id")
    private Nation nation;

    @Column(name = "img_title")
    private String imgTitle;

    @Column(name = "img_sub_title")
    private String imgSubTitle;

    @Column(name = "img_content", length = 500)
    private String imgContent;

    @Column(name = "img_num")
    private int imgNum;
}
