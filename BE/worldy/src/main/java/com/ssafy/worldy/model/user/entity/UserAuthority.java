//package com.ssafy.worldy.model.user.entity;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import lombok.experimental.SuperBuilder;
//
//import javax.persistence.*;
//
//@Entity
//@Data
//@SuperBuilder
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "user_authority")
//public class UserAuthority {
//
//    @Id
//    @GeneratedValue
//    @Column(name = "user_authority_id")
//    private Long userAuthorityId;   // auto_increment PK
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;  // 사용자
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "authority_name")
//    private Authority authority;    // 권한
//}
