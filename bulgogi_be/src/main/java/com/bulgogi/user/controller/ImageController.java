package com.bulgogi.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users/images")
public class ImageController {
    
    @GetMapping("/profile-options")
    public ResponseEntity<List<String>> getProfileOptions() {
        List<String> imageUrls = List.of(
                "/static/images/profile/pi1.png",
                "/static/images/profile/pi2.png",
                "/static/images/profile/pi3.png",
                "/static/images/profile/pi4.png",
                "/static/images/profile/pi5.png",
                "/static/images/profile/pi6.png",
                "/static/images/profile/pi7.png",
                "/static/images/profile/pi8.png",
                "/static/images/profile/pi9.png",
                "/static/images/profile/pi10.png"
        );
        return ResponseEntity.ok(imageUrls);
    }
}
