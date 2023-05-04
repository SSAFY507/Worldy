package com.ssafy.worldy.model.adventure.entity;

import com.ssafy.worldy.model.adventure.dto.NewsDto;
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
@Table(name = "news")
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_id", nullable = false)
    private Long newsId;

    @ManyToOne
    @JoinColumn(name = "nation_id")
    private Nation nation;

    @Column(name = "news_title", nullable = false)
    private String newsTitle;

    @Column(name = "news_summary", nullable = false)
    private String newsSummary;

    @Column(name = "news_img", nullable = false)
    private String newsImg;

    @Column(name = "news_url", nullable = false)
    private String newsUrl;

    public NewsDto toDto(){
        return NewsDto.builder()
                .newsId(this.newsId)
                .nationName(this.nation.getNationName())
                .newsTitle(this.newsTitle)
                .newsSummary(this.newsSummary)
                .newsImg(this.newsImg)
                .newsUrl(this.newsUrl)
                .build();
    }
}