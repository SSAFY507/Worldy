package com.ssafy.worldy.model.adventure.entity;

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

    @Column(name = "original_img")
    private String originalImg;

    @Column(name = "hidden_img")
    private String hiddenImg;
}
