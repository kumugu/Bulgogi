//package com.bulgogi.user.service;
//
//import com.bulgogi.user.dto.UserLoginDTO;
//import com.bulgogi.user.repository.UserRepository;
//import com.bulgogi.user.security.JwtProvider;
//import jakarta.servlet.http.HttpServletResponse;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.util.Map;
//import java.util.Optional;
//
//@SpringBootTest
//class UserServiceTest {
//
//    @Mock
//    private JwtProvider jwtProvider;
//
//    @Mock
//    private UserRepository userRepository;
//
//    @Mock
//    private PasswordEncoder passwordEncoder;
//
//    @Mock
//    private TokenService tokenService;
//
//    @InjectMocks
//    private UserService userService;
//
//    @Test
//    void testLogin() {
//        // 사용자 정보 준비
//        String email = "asdf@asdf.asdf";
//        String password = "asdf";
//
//        UserLoginDTO mockUser = new UserLoginDTO(1L, email, password, "asdf", false);
//
//        // 유저가 존재한다고 가정하여 mock처리
//        Mockito.when(userRepository.findEmailAndPasswordByEmail(email)).thenReturn(Optional.of(mockUser));
//
//        // 비밀번호 매칭 결과 설정
//        Mockito.when(passwordEncoder.matches(password, mockUser.getPassword())).thenReturn(true);
//
//        // 토큰 생성 결과 설정
//        Mockito.when(jwtProvider.generateToken(mockUser.getId(), mockUser.getUsername())).thenReturn("mockAccessToken");
//        Mockito.when(jwtProvider.generateRefreshToken(mockUser.getId(), mockUser.getUsername())).thenReturn("mockRefreshToken");
//
//        // tokenService.storeRefreshToken 메서드 동작 설정
//        Mockito.doNothing().when(tokenService).storeRefreshToken(Mockito.anyString(), Mockito.anyLong());
//
//        // 로그인 메서드 호출
//        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
//        Map<String, String> result = userService.login(email, password, response);
//
//        // 토큰 확인
//        Assertions.assertNotNull(result);
//        Assertions.assertEquals("mockAccessToken", result.get("accessToken"));
//        Assertions.assertEquals("mockRefreshToken", result.get("refreshToken"));
//
//        // tokenService.storeRefreshToken이 호출되었는지 확인
//        Mockito.verify(tokenService).storeRefreshToken(Mockito.eq("mockRefreshToken"), Mockito.eq(mockUser.getId()));
//    }
//}