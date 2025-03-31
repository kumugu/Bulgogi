package com.bulgogi.user.service;

import com.bulgogi.user.dto.UserRequestDTO;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.exception.UnauthorizedException;
import com.bulgogi.user.exception.UserNotFoundException;
import com.bulgogi.user.mapper.UserMapper;
import com.bulgogi.user.model.User;
import com.bulgogi.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final S3Service s3Service;

    @Autowired
    public AdminService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper, S3Service s3Service) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.s3Service = s3Service;
    }

    /**
     * 1. 사용자 정보 수정(관리자)
     * 마지막 업데이트: 2025-03-22 00:01
     */

    // 다른 사용자 정보 수정 (ADMIN 만 수정 가능)
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponseDTO adminUpdateUserInfo(Long targetUserId, UserRequestDTO userRequestDTO) {
        User currentUser = getCurrentAuthenticatedUser();
        User user = userRepository.findById(targetUserId)
                .orElseThrow(() -> new UserNotFoundException("해당 사용자를 찾을 수 없습니다."));

        // 유효성 검증
        // 관리자 자신을 수정하려는 경우 제한
        if (currentUser.getId().equals(user.getId())) {
            throw new UnauthorizedException("관리자는 자신의 정보를 수정할 수 없습니다.");
        }
        // ROLE 변경 방지
        if (userRequestDTO.getId() != null && !userRequestDTO.getRole().equals(user.getRole())) {
            throw new UnauthorizedException("권한을 변경할 수 없습니다.");
        }
        // 입력값 검증
        if (userRequestDTO.getUsername() != null && userRequestDTO.getUsername().length() > 20) {
            throw new IllegalArgumentException("사용자 이름은 20자 이하로 입력해야 합니다.");
        }
        if (userRequestDTO.getBio() != null && userRequestDTO.getBio().length() > 255) {
            throw new IllegalArgumentException("자기소개는 255자 이하로 입력해야 합니다.");
        }
        // isDeleted 처리 제한
        if (userRequestDTO.isDeleted() != null && userRequestDTO.isDeleted() && user.getRole().equals("ADMIN")) {
            throw new UnauthorizedException("관리자는 삭제할 수 없습니다.");
        }

        // 수정할 필드 업데이트
        if (userRequestDTO.getUsername() != null) {
            user.setUsername(userRequestDTO.getUsername());
        }
        if (userRequestDTO.getBio() != null) {
            user.setBio(userRequestDTO.getBio());
        }
        if (userRequestDTO.getProfileImage() != null) {
            user.setProfileImage(userRequestDTO.getProfileImage());
        }
        if (userRequestDTO.isDeleted() != null) {
            user.setDeleted(userRequestDTO.isDeleted());
        }

        User updateUser = userRepository.save(user);
        UserResponseDTO dto = userMapper.toUserResponseDTO(updateUser);
        dto.setProfileImageUrl(s3Service.getFileUrl(updateUser.getProfileImage()));
        return dto;
    }

    // 현재 로그인한 사용자 정보를 가져오는 메서드
    private User getCurrentAuthenticatedUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("현재 로그인한 사용자를 찾을 수 없습니다."));
    }
}
