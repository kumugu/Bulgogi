package com.bulgogi.user.controller;

import com.bulgogi.user.dto.UserLoginRequestDTO;
import com.bulgogi.user.dto.UserLoginResponseDTO;
import com.bulgogi.common.exception.InvalidPasswordException;
import com.bulgogi.common.exception.InvalidTokenException;
import com.bulgogi.common.exception.UserDeactivatedException;
import com.bulgogi.common.exception.UserNotFoundException;
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
    public ResponseEntity<UserLoginResponseDTO> login(
            @RequestBody @Valid UserLoginRequestDTO userLoginRequestDTO,
            HttpServletResponse response,
            BindingResult bindingResult) {

        // 유효성 검사 오류 처리
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldErrors()
                    .stream()
                    .findFirst()
                    .map(FieldError::getDefaultMessage)
                    .orElse("입력값이 올바르지 않습니다.");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new UserLoginResponseDTO(null, null, errorMessage));
        }

        try {
            UserLoginResponseDTO loginResponseDTO = authenticationService.login(
                    userLoginRequestDTO.getEmail(),
                    userLoginRequestDTO.getPassword(),
                    response);
            return ResponseEntity.ok(loginResponseDTO);
        } catch (UserNotFoundException | InvalidPasswordException | UserDeactivatedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new UserLoginResponseDTO(null, null, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UserLoginResponseDTO(null, null, "서버 오류가 발생했습니다."));
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
