package com.ssafy.worldy.model.help.entity;

import com.ssafy.worldy.model.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "help")
public class Help {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "help_id", nullable = false)
    private Long helpId; // auto_increment PK

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // 회원

    private String category; // 문의 카테고리

    private String content; // 문의 내용

    private String answer; // 답변

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdTime; // 문의 등록 시간

    @PrePersist
    public void prePersist() {
        this.createdTime = LocalDateTime.now();
    }
}