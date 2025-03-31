package com.bulgogi.user.controller;

import com.bulgogi.user.dto.*;
import com.bulgogi.user.security.JwtProvider;
import com.bulgogi.user.security.UserAuthorization;
import com.bulgogi.user.service.TokenService;
import com.bulgogi.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtProvider jwtProvider;
    private final TokenService tokenService;
    @Value("${aws.s3.bucketUrl}")
    private String s3BucketUrl;

    @Autowired
    public UserController(UserService userService, JwtProvider jwtProvider, TokenService tokenService) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
        this.tokenService = tokenService;
    }

    // 이메일로 사용자 조회 (로그인 및 계정 조회 시 사용)
    @GetMapping(value = "/email/{email}", produces = "application/json")
    public ResponseEntity<UserResponseDTO> getUserByEmail(@PathVariable String email) {
        UserResponseDTO user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    // 사용자명으로 사용자 조회 (프로필 검색 시 사용)
    @GetMapping("/username/{username}")
    public ResponseEntity<UserResponseDTO> getUserByUsername(@PathVariable String username) {
        UserResponseDTO user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    // 다른 사용자 정보 조회 (username 조회: 외부 검색 용도, 공개된 정보 조회)
    @GetMapping("/info/{username}")
    public ResponseEntity<UserResponseDTO> getUserInfo(@PathVariable String username) {
        UserResponseDTO user = userService.getUserInfo(username);
        return ResponseEntity.ok(user);
    }

    // 특정 유저 정보 조회 (userId 조회: 내부 사용 용도, 공개된 정보 조회)
    @GetMapping("/info/id/{userId}")
    public ResponseEntity<UserResponseDTO> getUserInfoById(@PathVariable Long userId) {
        UserResponseDTO user = userService.getUserInfoById(userId);
        return ResponseEntity.ok(user);
    }

    // 자기 정보 조회 (로그인한 사용자의 정보 조회)
    @GetMapping("/my-info")
    public ResponseEntity<UserResponseDTO> getMyInfo(@RequestHeader("Authorization") String token) {
        String jwtToken = token.replace("Bearer ", "");
        Long userId = jwtProvider.extractUserId(jwtToken);

        UserResponseDTO userResponseDTO = userService.getMyInfo(userId);
        return ResponseEntity.ok(userResponseDTO);
    }

    // JWT 토큰에서 userId 추출
    private Long extractUserIdFormToken(String token) {
        // 1. "Bearer " 접두어 제거
        String jwtToken = token.replace("Bearer ", "");
        // 2. JWT 토큰에서 userId 추출
        return jwtProvider.extractUserId(jwtToken);
    }

    // 자기 정보 수정 (bio)
    @PutMapping("/my-info/bio")
    @UserAuthorization
    public ResponseEntity<UserUpdateBioResponseDTO> updateMyBio(
            @RequestHeader("Authorization") String token,   // 요청 헤더에서 Authorization 토큰 추출
            @RequestBody UserUpdateBioRequestDTO bioDTO) {  // 클라이언트로부터 전달받은 bio 업데이트 데이터

        // 1. Authorization 헤더의 유효성 확인
        if (!token.startsWith("Bearer ")) {
            throw new IllegalArgumentException("유효하지 않은 Authorization 헤더입니다.");
        }
        // 2. JWT 토큰에서 사용자 ID 추출
        Long userId = extractUserIdFormToken(token);
        // 3. 사용자 Bio 업데이트 (서비스 계층 호출)
        UserUpdateBioResponseDTO  updatedUser = userService.updateBio(userId, bioDTO);
        // 4. HTTP 응답 반환 (업데이트된 사용자 정보)
        return ResponseEntity.ok(updatedUser);
    }
}