package com.bulgogi.user.controller;

import com.bulgogi.user.dto.UserPasswordChangeRequestDTO;
import com.bulgogi.user.dto.UserRequestDTO;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.security.JwtProvider;
import com.bulgogi.user.security.UserAuthorization;
import com.bulgogi.user.service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class AccountController {

    private final AccountService accountService;
    private final JwtProvider jwtProvider;

    public AccountController(AccountService accountService, JwtProvider jwtProvider) {
        this.accountService = accountService;
        this.jwtProvider = jwtProvider;
    }

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> getUserByEmail(@RequestBody @Valid UserRequestDTO userRequestDTO) {
        UserResponseDTO userResponseDTO = accountService.registerUser(userRequestDTO);
        return ResponseEntity.status(201).body(userResponseDTO);
    }

    // 비밀번호 변경 (기존 비밀번호 확인 후 새 비밀번호로 변경)
    @PutMapping("/change-password")
    @UserAuthorization
    public ResponseEntity<Void> changePassword(
            @RequestHeader("Authorization") String token,
            @RequestBody UserPasswordChangeRequestDTO userPasswordChangeRequestDTO) {

        String jwtToken = token.replace("Bearer ", "");
        Long userId = jwtProvider.extractUserId(jwtToken);

        accountService.changePassword(userId, userPasswordChangeRequestDTO);
        return ResponseEntity.ok().build();
    }

    // 회원 탈퇴 (소프트 삭제 처리)
    @DeleteMapping("/delete-my-info")
    public ResponseEntity<Void> deleteMyInfo(
            @RequestHeader("Authorization") String token) {

        String jwtToken = token.replace("Bearer ", "");
        Long userId = jwtProvider.extractUserId(jwtToken);

        accountService.deleteMyInfo(userId);
        return ResponseEntity.ok().build();
    }



}
