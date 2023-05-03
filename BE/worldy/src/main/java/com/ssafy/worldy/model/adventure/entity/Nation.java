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
@Table(name = "nation")
public class Nation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nation_id", nullable = false)
    private Long nationId; // auto_increment PK

    @Column(name = "nation_name", nullable = false)
    private String nationName; // 국가명
}