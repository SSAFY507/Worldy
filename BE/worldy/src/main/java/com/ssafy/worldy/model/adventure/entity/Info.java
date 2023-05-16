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
    private Nation nation;

    @Column(name = "category")
    private String category;

    @Column(name = "name")
    private String name;

    @Column(name = "content", length = 2000)
    private String content;

    @Column(name = "img_url")
    private String img_url;

    @Column(name = "video_url")
    private String video_url;

    @Column(name = "insta_url")
    private String insta_url;

    public InfoDto toDto(){
        return InfoDto.builder()
                .infoId(this.infoId)
                .nationName(this.nation.getNationName())
                .category(this.category)
                .name(this.name)
                .content(this.content)
                .img_url(this.img_url)
                .video_url(this.video_url)
                .insta_url(this.insta_url)
                .build();
    }
}
