package com.bulgogi.user.service;

import com.bulgogi.user.dto.UserLoginDTO;
import com.bulgogi.user.exception.InvalidPasswordException;
import com.bulgogi.user.exception.InvalidTokenException;
import com.bulgogi.user.exception.UserDeactivatedException;
import com.bulgogi.user.exception.UserNotFoundException;
import com.bulgogi.user.model.User;
import com.bulgogi.user.repository.UserRepository;
import com.bulgogi.user.security.JwtProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;

public class AuthenticationService {

    private final JwtProvider jwtProvider;
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static final Logger logger = (Logger) LoggerFactory.getLogger(AuthenticationService.class);

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider, TokenService tokenService) {
        this.jwtProvider = jwtProvider;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     *
     * 1. 로그인
     * 2. 토큰 갱신
     * 3. RefreshToken 쿠키 값 추출
     * 4. 로그아웃
     *
     * 마지막 업데이트: 2025-03-22 00:01
     */

    // 로그인 (사용자 인증 및 JWT 발급)
    public Map<String, String> login(String email, String password, HttpServletResponse response) {
        try {
            // 이메일로 사용자 찾기
            UserLoginDTO userLoginDTO = userRepository.findEmailAndPasswordByEmail(email)
                    .orElseThrow(() -> new UserNotFoundException("이메일을 찾을 수 없습니다."));
            // 로그 - 디버깅용
            logger.debug("Found user: {}", userLoginDTO.getEmail());

            // 사용자 데이터 추출
            Long userId = userLoginDTO.getId();
            String username = userLoginDTO.getUsername();
            String storedEmail = userLoginDTO.getEmail();
            String storedPassword = userLoginDTO.getPassword();
            boolean deleted = userLoginDTO.isDeleted();

            // 이메일 일치 확인
            if (!storedEmail.equals(email)) {
                throw new UserNotFoundException("이메일을 찾을 수 없습니다.");
            }

            // 비밀번호 비교
            if (!passwordEncoder.matches(password, storedPassword)) {
                throw new InvalidPasswordException("비밀번호가 일치하지 않습니다.");
            }

            // 탈퇴 여부 확인
            if (deleted) {
                throw new UserDeactivatedException("탈퇴한 계정입니다.");
            }

            // JWT 토큰 생성
            String accessToken = jwtProvider.generateToken(userId, username);
            String refreshToken = jwtProvider.generateRefreshToken(userId, username);

            // Redisd에서 기존 토큰 삭제 후 Refresh Token을 새로 저장
            tokenService.deleteRefreshToken(refreshToken);
            tokenService.storeRefreshToken(refreshToken, userId);

            // Refresh Token을 HttpOnly 쿠키에 저장
            jwtProvider.setRefreshToken(response, refreshToken);

            // 토큰을 Map에 저장
            Map<String, String> token = new HashMap<>();
            token.put("accessToken", accessToken);

            return token;
        } catch (UserNotFoundException | InvalidPasswordException | UserDeactivatedException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Login error:", e);
            throw new RuntimeException("서버 내부 오류가 발생했습니다.", e);
        }
    }

    // 토큰 갱신 (만료된 Access Token을 Refresh Token으로 재발급)
    public Map<String, String> refreshToken(String refreshToken) {
        // Refresh Token 검증
        Long userId = tokenService.getRefreshToken(refreshToken);
        if (userId == null) {
            throw new InvalidTokenException("유효하지 않은 리프레시 토큰입니다.");
        }

        // 사용자 정보 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
        String username = user.getUsername();

        // 새로운 Access Token과 Refresh Token 발급
        String newAcceccToken = jwtProvider.generateToken(userId, username);
        String newRefreshToken = jwtProvider.generateRefreshToken(userId, username);

        // 기존의 Refresh Token 삭제 후 새로 저장
        tokenService.deleteRefreshToken(refreshToken);
        tokenService.storeRefreshToken(refreshToken, userId);

        // JWT Token을 Map에 저장
        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", newAcceccToken);
        tokens.put("refreshToken", newRefreshToken);

        return tokens;
    }

    // Refresh Token 쿠키 값 추출
    public String extractRefreshTokenFromRequest(HttpServletRequest request) {
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }
        return refreshToken;
    }

    // 로그아웃 (클라이언트 측에서 JWT를 삭제하는 방법으로 처리)
    public void logout(String refreshToken, HttpServletResponse response) {
        // Redis에서 Refresh Token 삭제
        tokenService.deleteRefreshToken(refreshToken);

        // 클라이언트 쿠키에서 Refresh Token 삭제
        jwtProvider.clearRefreshToken(response);
    }
}
