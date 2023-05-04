package com.ssafy.worldy.model.quiz.entity;

import com.ssafy.worldy.model.adventure.entity.Nation;
import com.ssafy.worldy.model.quiz.dto.NewsQuizDto;
import com.ssafy.worldy.model.quiz.dto.QuizDto;
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
@Table(name = "quiz")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id", nullable = false)
    private Long quizId; // auto_increment PK

    @ManyToOne
    @JoinColumn(name="nation_id")
    private Nation nation; // 나라

    @Column(name = "publisher_type", nullable = false)
    private String publisherType; // 출제자 - gpt, worldy, user

    @Column(name = "quiz_type", nullable = false)
    private String quizType; // 퀴즈 타입 - 빈칸, 객관식, 주관식

    @Column(name = "category", nullable = false)
    private String category; // 퀴즈 카테고리 - 시사/문화, 역사, 기타

    @Column(name = "level", nullable = false)
    private int level; // 퀴즈 난이도

    @Column(name = "image", nullable = true)
    private String image; // 퀴즈 이미지

    @Column(name = "content", nullable = false, length = 1000)
    private String content; // 퀴즈 내용

    @Column(name = "answer", nullable = false)
    private String answer; // 정답

    @Column(name = "hint", nullable = true)
    private String hint; // 힌트

    @Column(name = "hint_type", nullable = true)
    private boolean hintType; // 힌트 타입 - 초성 1 아니면 0

    @Column(name = "commentary", nullable = false, length = 1000)
    private String commentary; // 해설

    @Column(name = "report", nullable = false)
    private int report; // 신고 수

    public NewsQuizDto toNewsQuizDto(){
        return NewsQuizDto.builder()
                .quizId(this.quizId)
                .publisherType(this.publisherType)
                .quizType(this.quizType)
                .category(this.category)
                .level(this.level)
                .image(this.image)
                .content(this.content)
                .answer(this.answer)
                .hint(this.hint)
                .hint_type(this.hintType)
                .commentary(this.commentary)
                .build();
    }

    // Entity -> DTO 변환을 위함 (multiAnswerList는 비어있는 Dto가 생성됨)
    public QuizDto toDto() {
        return QuizDto.builder()
                .quizId(this.quizId)
                .nation(this.nation)
                .publisherType(this.publisherType)
                .quizType(this.quizType)
                .category(this.category)
                .level(this.level)
                .image(this.image)
                .content(this.content)
                .answer(this.answer)
                .hint(this.hint)
                .hintType(this.hintType)
                .commentary(this.commentary)
                .report(this.report).build();
    }
}