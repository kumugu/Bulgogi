package com.bulgogi.user.controller;

import com.bulgogi.user.dto.UserLoginDTO;
import com.bulgogi.user.exception.InvalidPasswordException;
import com.bulgogi.user.exception.InvalidTokenException;
import com.bulgogi.user.exception.UserDeactivatedException;
import com.bulgogi.user.exception.UserNotFoundException;
import com.bulgogi.user.security.JwtProvider;
import com.bulgogi.user.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Collections;
import java.util.Map;


@RestController
@RequestMapping("/api/users")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final JwtProvider jwtProvider;

    public AuthenticationController(AuthenticationService authenticationService, JwtProvider jwtProvider) {
        this.authenticationService = authenticationService;
        this.jwtProvider = jwtProvider;
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
            Map<String, String> tokens = authenticationService.login(userLoginDTO.getEmail(), userLoginDTO.getPassword(), response);
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
        String refreshToken = authenticationService.extractRefreshTokenFromRequest(request);
        if (refreshToken == null) {
            throw new InvalidTokenException("리프레시 토큰이 없습니다.");
        }
        Map<String, String> tokens = authenticationService.refreshToken(refreshToken);
        return ResponseEntity.ok(tokens);
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        // 헤더에서 인증 정보 확인
        String authHeader = request.getHeader("Authorization");

        // 쿠키에서 Refresh Token 추출
        String refreshToken = authenticationService.extractRefreshTokenFromRequest(request);

        // 리프레시 토큰이 있으면 삭제
        if (refreshToken != null && !refreshToken.isEmpty()) {
            authenticationService.logout(refreshToken, response);
        } else {
            // 리프레시 토큰이 없어도 응답 쿠키는 삭제
            jwtProvider.clearRefreshToken(response);
        }
        return ResponseEntity.ok().body("로그아웃 성공");
    }

}
