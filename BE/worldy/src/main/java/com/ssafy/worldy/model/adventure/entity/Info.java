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
    private String imgUrl;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "insta_url")
    private String instaUrl;

    @Column(name = "sub_name")
    private String subName;

    public InfoDto toDto(){
        return InfoDto.builder()
                .infoId(this.infoId)
                .nationName(this.nation.getNationName())
                .category(this.category)
                .name(this.name)
                .content(this.content)
                .imgUrl(this.imgUrl)
                .videoUrl(this.videoUrl)
                .instaUrl(this.instaUrl)
                .subName(this.subName)
                .build();
    }
}
