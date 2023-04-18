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
    private Long userId;    // 아이디

    @Column(name = "password", nullable = false)
    private String password;    // 비밀번호

    @Column(name = "kakao_id", length = 50, nullable = false, unique = true)
    private String kakaoId;    // 카카오 아이디

    @JsonIgnore
    @Column(name = "activated")
    private boolean activated;  // 활성화 여부

    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities;
}
