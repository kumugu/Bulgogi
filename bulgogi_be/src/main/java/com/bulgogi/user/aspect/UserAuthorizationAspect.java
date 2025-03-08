package com.bulgogi.user.aspect;

import com.bulgogi.user.security.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.nio.file.AccessDeniedException;

@Aspect
@Component
public class UserAuthorizationAspect {

    private final JwtProvider jwtProvider;

    public UserAuthorizationAspect(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Around("@annotation(com.bulgogi.user.security.UserAuthorization) && args(userId,..)")
    public Object authorizeUser(ProceedingJoinPoint joinPoint, Long userId) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new AccessDeniedException(("Authorization 헤더가 필요합니다"));
        }

        String token = authHeader.replace("Bearer ", "");

        if (!jwtProvider.validateToken(token)) {
            throw new AccessDeniedException("유효하지 않은 토근입니다");
        }

        Long tokenUserId = jwtProvider.extractUserId(token);

        if (!tokenUserId.equals(userId)) {
            throw new AccessDeniedException("자신의 정보만 수정할 수 있습니다.");
        }

        return joinPoint.proceed();
    }
}
