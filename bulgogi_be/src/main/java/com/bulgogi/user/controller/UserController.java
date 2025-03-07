package com.bulgogi.user.controller;

import com.bulgogi.user.dto.UserLoginDTO;
import com.bulgogi.user.dto.UserRequestDTO;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.exception.InvalidTokenException;
import com.bulgogi.user.security.JwtProvider;
import com.bulgogi.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtProvider jwtProvider;

    @Autowired
    public UserController(UserService userService, JwtProvider jwtProvider) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }

    // 이메일로 사용자 조회 (로그인 및 계정 조회 시 사용)
    @GetMapping("/email/{email}")
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

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> getUserByEmail(@RequestBody @Valid UserRequestDTO userRequestDTO) {
        UserResponseDTO userResponseDTO = userService.registerUser(userRequestDTO);
        return ResponseEntity.status(201).body(userResponseDTO);
    }

    // 로그인 (사용자 인증 및 JWT 발급)
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid UserLoginDTO userLoginDTO) {
        String token = userService.login(userLoginDTO.getEmail(), userLoginDTO.getPassword());
        return ResponseEntity.ok(token);
    }

    // 토큰 갱신 (만료된 Access Token을 Refresh Token으로 재발급)
    @PostMapping("/refresh-token")
    public ResponseEntity<String> refreshToken(@RequestParam String refreshToken) {
        try {
            String newToken = userService.refreshToken(refreshToken);
            return ResponseEntity.ok(newToken);
        } catch (InvalidTokenException ex) {
            return ResponseEntity.status(401).body(ex.getMessage());
        }
    }

    // 자기 정보 조회 (로그인한 사용자의 정보 조회)
    @GetMapping("/my-info")
    public ResponseEntity<UserResponseDTO> getMyInfo(@RequestHeader("Authorization") String token) {
        String jwtToken = token.replace("Bearer ", "");
        Long userId = jwtProvider.extractUserId(jwtToken);

        UserResponseDTO userResponseDTO = userService.getMyInfo(userId);
        return ResponseEntity.ok(userResponseDTO);
    }

    // 자기 정보 수정 (로그인한 사용자의 정보 수정)
    @PutMapping("/my-info")
    public ResponseEntity<UserResponseDTO> updateMyInfo(@RequestParam String email, @RequestBody UserRequestDTO userRequestDTO) {
        UserResponseDTO updatedUser = userService.updateMyInfo(email, userRequestDTO);
        return ResponseEntity.ok(updatedUser);
    }

    // 비밀번호 변경 (기존 비밀번호 확인 후 새 비밀번호로 변경)
    @PutMapping("/change-password")
    public ResponseEntity<Void> changePassword(@RequestParam String email, @RequestParam String OldPassword, @RequestParam String NewPassword) {
        userService.changePasword(email, OldPassword, NewPassword);
        return ResponseEntity.ok().build();
    }

    // 회원 탈퇴 (소프트 삭제 처리)
    @DeleteMapping("/delte")
    public ResponseEntity<Void> deleteUser(@RequestParam String email) {
        userService.deleteUser(email);
        return ResponseEntity.noContent().build();
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

    // 다른 사용자 정보 수정 (ROLE_ADMIN 만 수정 가능)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/update/{userId}")
    public ResponseEntity<UserResponseDTO> updateUserInfo(@PathVariable Long userId, @RequestBody UserRequestDTO userRequestDTO) {
        UserResponseDTO updateUser = userService.updateUserInfo(userId, userRequestDTO);
        return ResponseEntity.ok(updateUser);
    }
}
