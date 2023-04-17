package com.ssafy.worldy.model.user.service;

import com.ssafy.worldy.model.user.entity.User;
import com.ssafy.worldy.model.user.repo.UserRepo;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    public CustomUserDetailsService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    // DB에서 권한 정보와 유저 정보 함께 가져오기
    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String userName) {
        return userRepo.findOneWithAuthoritiesByUserName(userName)
                .map(user -> createUser(userName, user))
                .orElseThrow(() -> new UsernameNotFoundException(userName + " -> 데이터베이스에서 찾을 수 없습니다."));
    }

    // 해당 유저가 활성 상태라면, DB에서 가져온 정보를 기반으로 User 객체 생성하여 리턴
    private org.springframework.security.core.userdetails.User createUser(String username, User user) {
        if (!user.isActivated()) {
            throw new RuntimeException(username + " -> 활성화되어 있지 않습니다.");
        }

        List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(user.getUserName(),
                user.getPassword(),
                grantedAuthorities);
    }
}