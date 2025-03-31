package com.bulgogi.user.controller;

import com.bulgogi.user.dto.UserProfileImageResponseDTO;
import com.bulgogi.user.security.JwtProvider;
import com.bulgogi.user.security.UserAuthorization;
import com.bulgogi.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class S3Controller {

    private final UserService userService;
    private final JwtProvider jwtProvider;

    public S3Controller(UserService userService, JwtProvider jwtProvider) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }


    // 자기 정보 조회 (profileImage URL 조회)
    @GetMapping("/profile-image")
    @UserAuthorization
    public ResponseEntity<UserProfileImageResponseDTO> getProfileImageByToken(@RequestHeader("Authorization") String token) {
        Long userId = extractUserIdFromToken(token);

        try {
            // UserService의 getProfileImage 메소드 사용
            UserProfileImageResponseDTO responseDTO = userService.getProfileImage(userId);
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UserProfileImageResponseDTO(""));
        }
    }

    // JWT 토큰에서 userId 추출
    private Long extractUserIdFromToken(String token) {
        String jwtToken = token.replace("Bearer ", "");
        return jwtProvider.extractUserId(jwtToken);
    }

    // 자기 정보 수정 (profile Image 업데이트)
    @PutMapping("/profile-image")
    @UserAuthorization
    public ResponseEntity<UserProfileImageResponseDTO> updateProfileImage(
            @RequestHeader("Authorization") String token,
            @RequestParam("file") MultipartFile file) {

        Long userId = extractUserIdFromToken(token);

        try {
            // UserService의 uploadAndSetProfileImage 메소드 사용
            UserProfileImageResponseDTO updatedUser = userService.uploadAndSetProfileImage(userId, file);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    // 자기 정보 삭제 (profile Image 삭제)
    @DeleteMapping("/profile-image")
    @UserAuthorization
    public ResponseEntity<Map<String, String>> deleteProfileImage(@RequestHeader("Authorization") String token) {
        Long userId = extractUserIdFromToken(token);

        try {
            // UserService의 removeProfileImage 메소드 사용
            userService.removeProfileImage(userId);

            // 성공 응답
            Map<String, String> response = new HashMap<>();
            response.put("message", "프로필 이미지가 삭제되었습니다.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "프로필 이미지 삭제 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse);
        }
    }
}