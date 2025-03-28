package com.bulgogi.user.service;

import com.bulgogi.user.dto.*;
import com.bulgogi.user.exception.*;
import com.bulgogi.user.mapper.UserMapper;
import com.bulgogi.user.model.User;
import com.bulgogi.user.repository.UserRepository;
import com.bulgogi.user.security.JwtProvider;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {


    private final UserRepository userRepository;
    private final S3Service s3Service;

    public UserService(UserRepository userRepository, S3Service s3Service) {
        this.userRepository = userRepository;
        this.s3Service = s3Service;
    }


    /**
     * 1. 이메일로 사용자 조회 (로그인 및 계정 조회 시 사용)
     * 2. 사용자명으로 사용자 조회 (프로필 검색 시 사용)
     * 3. 다른 사용자 정보 조회 (username 조회: 외부 검색 용도, 공개된 정보 조회)
     * 4. 특정 유저 정보 조회 (userId 조회: 내부 사용 용도, 공개된 정보 조회)
     * 5. 자기 정보 조회
     * 6. 자기 정보 수정(bio)
     * 7. 자기 정보 수정(profileImage - S3)
     *
     * 마지막 업데이트: 2025-03-28 17:03
     */

    // 이메일로 사용자 조회 (로그인 및 계정 조회 시 사용)
    public UserResponseDTO getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
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
    public UserResponseDTO updateProfileImage(Long userId, MultipartFile file) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        try {
            String profileImageUrl = s3Service.uploadFile(file);
            user.setProfileImage(profileImageUrl);
            user.setUpdatedAt(LocalDateTime.now());

            User updateUser = userRepository.save(user);
            return UserMapper.toUserResponseDTO(updateUser);
        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 중 오류 발생", e);
        }
    }
}
