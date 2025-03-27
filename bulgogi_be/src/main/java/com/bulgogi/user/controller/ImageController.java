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
                "/images/profile/pi1.png",
                "/images/profile/pi2.png",
                "/images/profile/pi3.png",
                "/images/profile/pi4.png",
                "/images/profile/pi5.png",
                "/images/profile/pi6.png",
                "/images/profile/pi7.png",
                "/images/profile/pi8.png",
                "/images/profile/pi9.png",
                "/images/profile/pi10.png"
        );
        return ResponseEntity.ok(imageUrls);
    }
}
