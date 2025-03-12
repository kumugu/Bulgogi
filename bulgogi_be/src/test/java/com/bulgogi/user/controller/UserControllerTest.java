package com.bulgogi.user.controller;

import com.bulgogi.user.dto.UserLoginDTO;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.security.JwtProvider;
import com.bulgogi.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.http.MediaType;

import java.time.LocalDateTime;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@ExtendWith(MockitoExtension.class)
@SpringBootTest
class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Mock
    private JwtProvider jwtProvider;

    @InjectMocks
    private UserController userController;

    private final ObjectMapper objectMapper = new ObjectMapper();   // JSON 변환 도구

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void testGetUserByEmail() throws Exception {
        UserResponseDTO sampleUser = new UserResponseDTO(1L, "asdf@asdf.asdf", "asdf", "profile.jpg", "asdf", "USER", LocalDateTime.now(), LocalDateTime.now());
        // Mock 설정
        when(userService.getUserByEmail("asdf@asdf.asdf")).thenReturn(sampleUser);

        // AccessToken 생성
        String accessToken = "Bearer mockAccessToken";

        // 요청 실행 및 결과 저장
        MvcResult result = mockMvc.perform(get("/api/users/email/asdf@asdf.asdf"))
                .andExpect(status().isOk())
                .andReturn();

        // 응답 내용 출력
        String response = result.getResponse().getContentAsString();
        System.out.println("응답내용: " + response);

        // 응답 헤더 확인
        String contentType = result.getResponse().getContentType();
        System.out.println("Content-Type: " + contentType);

        // 추가 검증
        mockMvc.perform(get("/api/users/email/asdf@asdf.asdf")
                        .accept(MediaType.APPLICATION_JSON)
                        .header("Authorization", accessToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.email").value("asdf@asdf.asdf"));
    }

    @Test
    void testLogin() throws Exception {
        Map<String, String> tokens = Map.of(
                "accessToken", "dummyAccessToken",
                "refreshToken", "dummyRefreshToken"
        );

        when(userService.login(any(String.class), any(String.class), any()))
                .thenReturn(tokens);

        // 로그인 요청 객체 생성
        UserLoginDTO loginRequest = new UserLoginDTO("asdf@asdf.asdf", "asdf");

        // API 요청 및 검증
        mockMvc.perform(post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest))) // JSON 변환
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("dummyAccessToken"))
                .andExpect(jsonPath("$.refreshToken").value("dummyRefreshToken"));
    }
}