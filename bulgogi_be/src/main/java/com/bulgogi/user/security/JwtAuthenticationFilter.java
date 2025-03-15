package com.bulgogi.user.security;

import com.bulgogi.user.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final UserDetailsService userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    public JwtAuthenticationFilter(JwtProvider jwtProvider, UserDetailsService userDetailsService) {
        this.jwtProvider = jwtProvider;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        logger.debug("JWT 필터 처리 시작: {}", request.getRequestURI());
        logger.debug("Authorization 헤더: {}", request.getHeader("Authorization"));

        // JWT 토큰 추출
        String token = extractToken(request);
        logger.debug("추출된 토큰: {}", token != null ? "존재함" : "없음");

        if (StringUtils.hasText(token)) {
            try {
                boolean isValid = jwtProvider.validateToken(token);
                logger.debug("토큰 유효성: {}", isValid);

                if (isValid) {
                    // userId와 username 추출
                    Long userId = jwtProvider.extractUserId(token);
                    String username = jwtProvider.extractUsername(token);
                    logger.debug("토큰에서 추출한 사용자 정보 - userId: {}, username: {}", userId, username);

                    // 사용자 정보 로드
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    // 인증 정보 설정
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    logger.debug("인증 정보 설정 완료");
                }
            } catch (Exception e) {
                logger.error("JWT 처리 중 오류 발생: {}", e.getMessage());
            }
        }

        // 다음 필터로 요청 전달
        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        logger.debug("Authorization 헤더: {}", bearerToken);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
