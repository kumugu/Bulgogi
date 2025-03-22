package com.bulgogi.user.service;

import com.bulgogi.user.dto.*;
import com.bulgogi.user.exception.*;
import com.bulgogi.user.mapper.UserMapper;
import com.bulgogi.user.model.User;
import com.bulgogi.user.repository.UserRepository;
import com.bulgogi.user.security.JwtProvider;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    private final UserMapper userMapper;
    private final JwtProvider jwtProvider;
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static final Logger logger = (Logger) LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserMapper userMapper, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider, TokenService tokenService) {
        this.userMapper = userMapper;
        this.jwtProvider = jwtProvider;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     *
     * 1. 이메일로 사용자 조회 (로그인 및 계정 조회 시 사용)
     * 2. 사용자명으로 사용자 조회 (프로필 검색 시 사용)
     * 3. 다른 사용자 정보 조회 (username 조회: 외부 검색 용도, 공개된 정보 조회)
     * 4. 특정 유저 정보 조회 (userId 조회: 내부 사용 용도, 공개된 정보 조회)
     * 5. 자기 정보 조회
     * 6. 자기 정보 수정(bio)
     * 7. 자기 정보 수정(profileImage)
     *
     * 마지막 업데이트: 2025-03-22 13:11
     */

    // 이메일로 사용자 조회 (로그인 및 계정 조회 시 사용)
    public UserResponseDTO getUserByEmail(String email) {
        Optional< User> user = userRepository.findByEmail(email);
        return user.map(UserMapper::toUserResponseDTO)
                .orElseThrow(() -> new UserNotFoundException("해당 이메일을 가진 사용자를 찾을 수 없습니다."));
    }

    // 사용자명으로 사용자 조회 (프로필 검색 시 사용)
    public UserResponseDTO getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(UserMapper::toUserResponseDTO)
                .orElseThrow(() -> new UserNotFoundException("해당 이름을 가진 사용자를 찾을 수 없습니다."));
    }

    // 다른 사용자 정보 조회 (username 조회: 외부 검색 용도, 공개된 정보 조회)
    public UserResponseDTO getUserInfo(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("해당 사용자를 찾을 수 없습니다."));
        return UserMapper.toUserResponseDTO(user);
    }

    // 특정 유저 정보 조회 (userId 조회: 내부 사용 용도, 공개된 정보 조회)
    public UserResponseDTO getUserInfoById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("해당 ID의 사용자를 찾을 수 없습니다."));
        return UserMapper.toUserResponseDTO(user);
    }

    // 자기 정보 조회 (로그인한 사용자의 정보 조회)
    public UserResponseDTO getMyInfo(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        return new UserResponseDTO(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.getProfileImage(),
                user.getBio(),
                user.getRole().name(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

    // 자기 정보 수정 - Bio
    @Transactional
    public UserResponseDTO updateBio(Long userId, UserUpdateBioRequestDTO bioRequest) {
        // 1. 사용자 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        // 2. DTO 유효성 검증
        bioRequest.validate();

        // 3. DTO 데이터로 Entity 필드 업데이트
        user.setBio(bioRequest.getBio());
        user.setUpdatedAt(LocalDateTime.now());

        // 4. 변경된 사용자 정보 저장
        userRepository.save(user);

        // 5. 응답 DTO 반환
        return UserMapper.toUserResponseDTO(user);
    }

    // 자기 정보 수정 - ProfileImage
    @Transactional
    public UserResponseDTO updateProfileImage(Long userId, UserUpdateProfileImageRequestDTO profileImageRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
        profileImageRequest.validate();
        user.setProfileImage(profileImageRequest.getProfileImage());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        return UserMapper.toUserResponseDTO(user);
    }
}
