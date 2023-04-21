package com.ssafy.worldy.model.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long userId; // auto_increment PK

    @Column(name = "password", nullable = false)
    private String password; // 비밀번호

    @Column(name = "kakao_id", length = 50, nullable = false, unique = true)
    private String kakaoId; // 카카오 아이디

    @Column(name = "profile_img")
    private String profileImg; // 카카오 프로필 이미지

    @Column(name = "sex")
    private String sex; // 성별

    @Column(name = "age")
    private String age; // 나이

    @JsonIgnore
    @Column(name = "activated")
    private boolean activated; // 활성화 여부

    @Column(name = "refresh_token")
    private String refreshToken; // refresh 토큰

    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities; // 권한

    // refresh 토큰 업데이트
    public void updateToken(String refreshToken){
        this.refreshToken = refreshToken;
    }
}
