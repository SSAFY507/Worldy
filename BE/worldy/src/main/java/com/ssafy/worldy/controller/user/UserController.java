package com.ssafy.worldy.controller.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        System.out.println("hello");
        return ResponseEntity.ok("hello");
    }
}
