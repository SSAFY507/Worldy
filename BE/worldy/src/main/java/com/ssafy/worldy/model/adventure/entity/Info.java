package com.ssafy.worldy.model.adventure.entity;

import com.ssafy.worldy.model.adventure.dto.InfoDto;
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
@Table(name = "info")
public class Info {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "info_id", nullable = false)
    private Long infoId;

    @ManyToOne
    @JoinColumn(name = "nation_id")
    Nation nation;

    @Column(name = "category")
    private String category;

    @Column(name = "content", length = 2000)
    private String content;

    @Column(name = "img")
    private String img;

    public InfoDto toDto(){
        return InfoDto.builder()
                .infoId(this.infoId)
                .nationName(this.nation.getNationName())
                .category(this.category)
                .content(this.content)
                .img(this.img)
                .build();
    }
}
