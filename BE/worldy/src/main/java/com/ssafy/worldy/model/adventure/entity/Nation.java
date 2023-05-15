package com.ssafy.worldy.model.adventure.entity;

import com.ssafy.worldy.model.adventure.dto.NationDto;
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

    // Entity -> DTO 변환을 위함
    public NationDto toDto() {
        return NationDto.builder()
                .nationId(this.nationId)
                .nationName(this.nationName).build();
    }
}