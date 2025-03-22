package com.bulgogi.user.service;

import com.bulgogi.user.dto.UserRequestDTO;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.exception.UserNotFoundException;
import com.bulgogi.user.mapper.UserMapper;
import com.bulgogi.user.model.User;
import com.bulgogi.user.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;

public class AdminService {

    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     *
     * 1. 사용자 정보 수정(관리자)
     *
     * 마지막 업데이트: 2025-03-22 00:01
     */

    // 다른 사용자 정보 수정 (ROLE_ADMIN 만 수정 가능)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public UserResponseDTO updateUserInfo(Long userId, UserRequestDTO userRequestDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("해당 사용자를 찾을 수 없습니다."));

        // 수정 할 필드
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

        User updatedUser = userRepository.save(user);
        return UserMapper.toUserResponseDTO(user);
    }

}
