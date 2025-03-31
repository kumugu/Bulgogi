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

import java.util.HashMap;
import java.util.Map;

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

    // 자기 정보 조회 (profileImage URL 조회)
    @GetMapping("/profile-image")
    @UserAuthorization
    public ResponseEntity<String> getProfileImageByToken(@RequestHeader("Authorization") String token) {
        Long userId = extractUserIdFromToken(token);

        try {
            // 사용자 정보에서 프로필 이미지 키 가져오기
            UserResponseDTO userDTO = userService.getMyInfo(userId);
            String profileImageKey = userDTO.getProfileImage();

            if (profileImageKey == null || profileImageKey.isEmpty()) {
                return ResponseEntity.ok("");
            }

            // S3Service에서 파일 URL 가져오기
            String profileImageUrl = s3Service.getFileUrl(profileImageKey);
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

    // 자기 정보 수정 (profile Image 업데이트)
    @PutMapping("/profile-image")
    @UserAuthorization
    public ResponseEntity<Map<String, String>> updateProfileImage(
            @RequestHeader("Authorization") String token,
            @RequestParam("file") MultipartFile file) {

        Long userId = extractUserIdFromToken(token);

        try {
            // 기존 프로필 이미지가 있다면 삭제
            UserResponseDTO userDTO = userService.getMyInfo(userId);
            if (userDTO.getProfileImage() != null && !userDTO.getProfileImage().isEmpty()) {
                s3Service.deleteFile(userDTO.getProfileImage());
            }

            // 파일 업로드 후 s3에 저장된 파일 경로 반환
            String fileKey = s3Service.uploadFile(file);

            // 사용자 정보 업데이트
            userService.updateProfileImage(userId, fileKey);

            // 클라이언트에게 접근 가능한 URL 반환
            String fileUrl = s3Service.getFileUrl(fileKey);

            // JSON 객체로 응답 반환
            Map<String, String> response = new HashMap<>();
            response.put("profileImageUrl", fileUrl);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "프로필 이미지 업데이트 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse);
        }
    }

    // 자기 정보 삭제 (profile Image 삭제)
    @DeleteMapping("/profile-image")
    @UserAuthorization
    public ResponseEntity<Map<String, String>> deleteProfileImage(@RequestHeader("Authorization") String token) {
        Long userId = extractUserIdFromToken(token);

        try {
            // S3에서 파일 삭제
            String fileName = "profile-images/" + userId + ".png";
            s3Service.deleteFile(fileName);

            // 기본 프로필 이미지 URL 반환
            String defaultImageUrl = "https://bulgogoi-image.s3.ap-northeast-2.amazonaws.com/profile-images/default-profile.png";
            userService.updateProfileImage(userId, defaultImageUrl);

            // 성공 응답
            Map<String, String> response = new HashMap<>();
            response.put("message", "프로필 이미지가 기본값으로 변경되었습니다.");
            response.put("profileImageUrl", defaultImageUrl);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "프로필 이미지 삭제 실패: " + e.getMessage()));
        }
    }
}