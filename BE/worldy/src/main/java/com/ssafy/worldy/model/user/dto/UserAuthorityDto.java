//package com.ssafy.worldy.model.user.dto;
//
//import com.ssafy.worldy.model.user.entity.Authority;
//import com.ssafy.worldy.model.user.entity.User;
//import com.ssafy.worldy.model.user.entity.UserAuthority;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import lombok.experimental.SuperBuilder;
//
//@Data
//@SuperBuilder
//@NoArgsConstructor
//@AllArgsConstructor
//public class UserAuthorityDto {
//
//    private Long userAuthorityId;
//
//    private UserDto userDto;
//
//    private AuthorityDto authorityDto;
//
//    // DTO -> Entity 변환
//    public UserAuthority toEntity() {
//        return UserAuthority.builder()
//                .userAuthorityId(this.userAuthorityId)
//                .user(this.userDto.toEntity())
//                .authority(this.authorityDto.toEntity()).build();
//    }
//}
