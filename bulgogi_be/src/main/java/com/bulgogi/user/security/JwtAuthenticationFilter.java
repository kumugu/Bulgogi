package com.bulgogi.user.security;

import com.bulgogi.user.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final UserDetailsService userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

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
        // JWT 토큰 추출
        String token = extractToken(request);
        logger.debug("Extracted token: {}", token != null ? "present" : "null");

        if (StringUtils.hasText(token) && jwtProvider.validateToken(token)) {
            // userId 추출
            Long userId = jwtProvider.extractUserId(token);
            logger.debug("Extracted userId: {}", userId);
            // 사용자 정보 로드
            UserDetails userDetails = userDetailsService.loadUserByUsername(userId.toString());
            logger.debug("Loaded userDetails username: {}", userDetails.getUsername());
            // JWT 인증 토큰 생성
            JwtAuthenticationToken authentication = new JwtAuthenticationToken(userDetails);
            // SecurityContext에 인증 정보 생성
            SecurityContextHolder.getContext().setAuthentication(authentication);
            logger.debug("Set authentication in SecurityContext");
        } else {
            logger.debug("No valid token found or token validation failed");
        }
        // 다음 필터로 요청 전달
        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
