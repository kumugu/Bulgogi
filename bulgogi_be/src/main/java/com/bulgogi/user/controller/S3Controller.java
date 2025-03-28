package com.bulgogi.user.controller;

import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.security.JwtProvider;
import com.bulgogi.user.security.UserAuthorization;
import com.bulgogi.user.service.S3Service;
import com.bulgogi.user.service.TokenService;
import com.bulgogi.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
public class S3Controller {

    private final S3Service s3Service;
    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final TokenService tokenService;

    public S3Controller(S3Service s3Service, UserService userService, JwtProvider jwtProvider, TokenService tokenService) {
        this.s3Service = s3Service;
        this.userService = userService;
        this.jwtProvider = jwtProvider;
        this.tokenService = tokenService;
    }

    // 자기 정보 수정 (profile Image 업데이트)
    @PutMapping("/profile-image")
    @UserAuthorization
    public ResponseEntity<?> updateProfileImage(
            @RequestHeader("Authorization") String token,
            @RequestParam("file") MultipartFile file) {

        // 토큰에서 userId 추출
        if (!token.startsWith("Bearer ")) {
            throw new IllegalArgumentException("유효하지 않은 Authorization 헤더입니다.");
        }
        Long userId = extractUserIdFromToken(token);

        try {
            // UserService를 통해 프로필 이미지 URL 업데이트
            UserResponseDTO updatedUser = userService.updateProfileImage(userId, file);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("프로필 이미지 업데이트 실패: " + e.getMessage());
        }
    }

    // 자기 정보 조회 (profileImage URL 조회)
    @GetMapping("/profile-image")
    @UserAuthorization
    public ResponseEntity<String> getProfileImageByToken(@RequestHeader("Authorization") String token) {
        Long userId = extractUserIdFromToken(token);

        try {
            // S3Service를 통해 파일 URL 가져오기
            String fileName = "profile-images/" + userId + ".png"; // 예시로 파일 이름을 userId로 설정
            String profileImageUrl = s3Service.getFileUrl(fileName);

            return ResponseEntity.ok(profileImageUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("프로필 이미지 URL 조회 실패: " + e.getMessage());
        }
    }

    // JWT 토큰에서 userId 추출
    private Long extractUserIdFromToken(String token) {
        String jwtToken = token.replace("Bearer ", "");
        // userId 추출 로직
        // 이 부분에서 JWT를 파싱하여 userId를 반환합니다.
        return jwtProvider.extractUserId(jwtToken);
    }
}