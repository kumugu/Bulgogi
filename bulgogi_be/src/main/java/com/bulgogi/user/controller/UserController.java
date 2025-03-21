package com.bulgogi.user.controller;

import com.bulgogi.user.dto.*;
import com.bulgogi.user.exception.InvalidPasswordException;
import com.bulgogi.user.exception.InvalidTokenException;
import com.bulgogi.user.exception.UserDeactivatedException;
import com.bulgogi.user.exception.UserNotFoundException;
import com.bulgogi.user.security.JwtProvider;
import com.bulgogi.user.security.UserAuthorization;
import com.bulgogi.user.service.TokenService;
import com.bulgogi.user.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.Valid;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtProvider jwtProvider;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final TokenService tokenService;

    @Autowired
    public UserController(UserService userService, JwtProvider jwtProvider, TokenService tokenService) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
        this.tokenService = tokenService;
    }

    // =================================================================================================================
    // 회원가입 로그인 로그아웃 토큰갱신
    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> getUserByEmail(@RequestBody @Valid UserRequestDTO userRequestDTO) {
        UserResponseDTO userResponseDTO = userService.registerUser(userRequestDTO);
        return ResponseEntity.status(201).body(userResponseDTO);
    }

    // 로그인 (사용자 인증 및 JWT 발급)
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody @Valid UserLoginDTO userLoginDTO, HttpServletResponse response, BindingResult bindingResult) {
        // 유효성 검사 오류가 있는 경우
        if (bindingResult.hasErrors()) {
            // 첫 번째 오류 메시지 가져오기
            String errorMessage = bindingResult.getFieldErrors()
                    .stream()
                    .findFirst()
                    .map(FieldError::getDefaultMessage)
                    .orElse("입력값이 올바르지 않습니다.");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", errorMessage));
        }
        try {
            // 로그인 시 엑세스 토큰과 리프레시 토큰 발급
            Map<String, String> tokens = userService.login(userLoginDTO.getEmail(), userLoginDTO.getPassword(), response);
            logger.info("Token: {}", tokens);
            return ResponseEntity.ok(tokens);
        } catch (UserNotFoundException | InvalidPasswordException | UserDeactivatedException e) {
            // 예외에 맞는 메시지를 반환
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "서버 오류가 발생했습니다."));
        }
    }

    // 토큰 갱신 (만료된 Access Token을 Refresh Token으로 재발급), 추가적인 테스트 필요
    @PostMapping("/refresh-token")
    public ResponseEntity<Map<String, String>> refreshToken(HttpServletRequest request) {
        String refreshToken = userService.extractRefreshTokenFromRequest(request);
        if (refreshToken == null) {
            throw new InvalidTokenException("리프레시 토큰이 없습니다.");
        }
        Map<String, String> tokens = userService.refreshToken(refreshToken);
        return ResponseEntity.ok(tokens);
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        // 헤더에서 인증 정보 확인
        String authHeader = request.getHeader("Authorization");
        logger.debug("로그아웃 요청 - Authorization 헤더: {}", authHeader);

        // 쿠키에서 Refresh Token 추출
        String refreshToken = userService.extractRefreshTokenFromRequest(request);
        logger.debug("로그아웃 요청 - 추출된 리프레시 토큰: {}", refreshToken != null ? "존재함" : "없음");

        // 리프레시 토큰이 있으면 삭제
        if (refreshToken != null && !refreshToken.isEmpty()) {
            userService.logout(refreshToken, response);
        } else {
            // 리프레시 토큰이 없어도 응답 쿠키는 삭제
            jwtProvider.clearRefreshToken(response);
        }
        return ResponseEntity.ok().body("로그아웃 성공");
    }
    // =================================================================================================================


    // =================================================================================================================
    // 자기 정보 수정
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
    @UserAuthorization
    public ResponseEntity<?> updateMyInfo(
            @RequestHeader("Authorization") String token,
            @RequestBody UserUpdateRequestDTO updateRequest) {

        String jwtToken = token.replace("Bearer ", "");
        Long userId = jwtProvider.extractUserId(jwtToken);

        UserResponseDTO updatedUser = userService.updateMyInfo(userId, updateRequest);
        return ResponseEntity.ok(updatedUser);
    }

    // 비밀번호 변경 (기존 비밀번호 확인 후 새 비밀번호로 변경)
    @PutMapping("/change-password")
    @UserAuthorization
    public ResponseEntity<Void> changePassword(
            @RequestHeader("Authorization") String token,
            @RequestBody UserPasswordChangeRequestDTO userPasswordChangeRequestDTO) {

        String jwtToken = token.replace("Bearer ", "");
        Long userId = jwtProvider.extractUserId(jwtToken);

        userService.changePassword(userId, userPasswordChangeRequestDTO);
        return ResponseEntity.ok().build();
    }

    // 회원 탈퇴 (소프트 삭제 처리)
    // 회원 탈퇴하면 로그인은 가능하나, 기능 이용은 못하도록, 30일 후 완전 삭제 안내
    @DeleteMapping("/delete-my-info")
    public ResponseEntity<Void> deleteMyInfo(
            @RequestHeader("Authorization") String token) {

        String jwtToken = token.replace("Bearer ", "");
        Long userId = jwtProvider.extractUserId(jwtToken);

        userService.deleteMyInfo(userId);
        return ResponseEntity.ok().build();
    }
    // =================================================================================================================


    // =================================================================================================================
    // 사용자 조회
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
    // =================================================================================================================


    // =================================================================================================================
    // ADMIN 기능
    // 다른 사용자 정보 수정 (ROLE_ADMIN 만 수정 가능)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/update/{userId}")
    public ResponseEntity<UserResponseDTO> updateUserInfo(@PathVariable Long userId, @RequestBody UserRequestDTO userRequestDTO) {
        UserResponseDTO updateUser = userService.updateUserInfo(userId, userRequestDTO);
        return ResponseEntity.ok(updateUser);
    }
    // =================================================================================================================

}
