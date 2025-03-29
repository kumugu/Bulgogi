package com.bulgogi.user.service;

import com.bulgogi.user.dto.UserPasswordChangeRequestDTO;
import com.bulgogi.user.dto.UserRequestDTO;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.exception.DuplicateUserException;
import com.bulgogi.user.exception.InvalidPasswordException;
import com.bulgogi.user.exception.UserNotFoundException;
import com.bulgogi.user.mapper.UserMapper;
import com.bulgogi.user.model.User;
import com.bulgogi.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Autowired
    public AccountService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    /**
     *
     * 1. 회원 가입
     * 2. 비밀번호 변경
     * 3. 회원 탈퇴
     *
     * 마지막 업데이트: 2025-03-22 00:01
     */

    // 회원가입
    public UserResponseDTO registerUser(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByEmail(userRequestDTO.getEmail())) {
            throw new DuplicateUserException("이미 사용 중인 이메일입니다.");
        }
        if (userRepository.existsByUsername(userRequestDTO.getUsername())) {
            throw new DuplicateUserException("이미 사용중인 사용자명입니다.");
        }

        if (!userRequestDTO.isValidPassword()) {
            throw new InvalidPasswordException("비밀번호는 최소 8자 이상, 대소문자, 숫자 및 특수문자를 포함하고 최대 20자여야 합니다.");
        }

        User user = userMapper.toUser(userRequestDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User saveUser = userRepository.save(user);
        return userMapper.toUserResponseDTO(saveUser);
    }

    // 비밀번호 변경 (기존 비밀번호 확인 후 새 비밀번호로 변경)
    @Transactional
    public void changePassword(Long userId, UserPasswordChangeRequestDTO userPasswordChangeRequestDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다." + userId));

        // 기존 비밀번호 확인
        if (!passwordEncoder.matches(userPasswordChangeRequestDTO.getOldPassword(), user.getPassword())) {
            throw new InvalidPasswordException("현재 비밀번호가 일치하지 않습니다.");
        }

        // 새 비밀번호 설정
        String encodedNewPassword = passwordEncoder.encode(userPasswordChangeRequestDTO.getNewPassword());
        user.setPassword(encodedNewPassword);

        // 변경된 사용자 정보 저장
        userRepository.save(user);
    }

    // 계정 삭제 (소프트 삭제 처리)
    public void deleteMyAccount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("해당 ID의 사용자를 찾을 수 없습니다: "  + userId));

        // DB에서 deleted 필드를 true로 변경
        user.setDeleted(true);
        userRepository.save(user);
    }

}
