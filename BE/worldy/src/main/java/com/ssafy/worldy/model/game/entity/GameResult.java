package com.ssafy.worldy.model.game.entity;

import com.ssafy.worldy.model.adventure.entity.Nation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "game_result")
@Builder
public class GameResult implements Serializable {

    @Id
    @Column(name = "game_result_id", nullable = false)
    private Long GameResultId;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nationId; // 식별키

    @Column(name = "first")
    private int first; // 1등한 횟수

    @Column(name = "second")
    private int second; // 2등한 횟수

    @Column(name = "third")
    private int third; // 3등한 횟수

    @Column(name = "fourth")
    private int fourth; // 4등한 횟수
}
