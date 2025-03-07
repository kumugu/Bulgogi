package com.bulgogi.user.service;

import com.bulgogi.user.dto.UserLoginDTO;
import com.bulgogi.user.dto.UserRequestDTO;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.exception.DuplicateUserException;
import com.bulgogi.user.exception.InvalidPasswordException;
import com.bulgogi.user.exception.InvalidTokenException;
import com.bulgogi.user.exception.UserNotFoundException;
import com.bulgogi.user.mapper.UserMapper;
import com.bulgogi.user.model.User;
import com.bulgogi.user.repository.UserRepository;
import com.bulgogi.user.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Autowired
    public UserService(UserMapper userMapper, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    /**
     * UserService는 사용자의 인증, 정보 조회, 수정 및 삭제와 관련된 기능을 제공.
     *
     * 1. 이메일로 사용자 조회 (로그인 및 계정 조회 시 사용)
     * 2. 사용자명으로 사용자 조회 (프로필 검색 시 사용)
     * 3. 회원가입 (새 사용자 등록)
     * 4. 로그인: 이메일과 비밀번호를 받아 인증 후 JWT 토큰을 발급.
     * 5. 로그아웃: 클라이언트 측에서 JWT 토큰 삭제를 처리.
     * 6. 토큰 갱신: 만료된 Access Token을 Refresh Token으로 재발급.
     * 7. 내 정보 조회: 로그인한 사용자의 정보를 조회.
     * 8. 내 정보 수정: 프로필 이미지, 자기소개, 이메일 등을 수정.
     * 9. 비밀번호 변경: 기존 비밀번호를 확인하고 새 비밀번호로 업데이트.
     * 10. 회원 탈퇴: 사용자 데이터를 삭제하거나 소프트 삭제 처리.
     * 11. 다른 사용자 정보 조회 (username 조회: 외부 검색 용도, 공개된 정보 조회)
     * 12. 특정 유저 정보 조회 (userId 조회: 내부 사용 용도, 공개된 정보 조회)
     * 13. 다른 사용자 정보 수정 (ROLE_ADMIN 만 수정 가능)
     *
     * 기능 추가 시 작성할 것
     * 마지막 업데이트: 2025-03-07 19:22
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

    // 회원가입
    public UserResponseDTO registerUser(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByEmail(userRequestDTO.getEmail())) {
            throw new DuplicateUserException("이미 사용 중인 이메일입니다.");
        }
        if (userRepository.existsByUsername(userRequestDTO.getUsername())) {
            throw new DuplicateUserException("이미 사용장인 사용자명입니다.");
        }

        User user = UserMapper.toUser(userRequestDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User saveUser = userRepository.save(user);
        return UserMapper.toUserResponseDTO(saveUser);
    }

    // 로그인 (사용자 인증 및 JWT 발급)
    public String login(String email, String password) {
        try {
            // 이메일로 사용자 찾기
            UserLoginDTO userLoginDTO = userRepository.findEmailAndPasswordByEmail(email)
                    .orElseThrow(() -> new UserNotFoundException("이메일을 찾을 수 없습니다."));

            // 사용자 데이터 추출
            Long userId = userLoginDTO.getId();
            String storedEmail = userLoginDTO.getEmail();
            String storedPassword = userLoginDTO.getPassword();

            // 이메일 일치 확인
            if (!storedEmail.equals(email)) {
                throw new UserNotFoundException("이메일을 찾을 수 없습니다.");
            }

            // 비밀번호 비교
            if (!passwordEncoder.matches(password, storedPassword)) {
                throw new InvalidPasswordException("비밀번호가 일치하지 않습니다.");
            }

            // JWT 토큰 생성 및 반환
            return jwtProvider.generateToken(userId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("서버 내부 오류 런타임~");
        }
    }

    // 로그아웃 (클라이언트 측에서 JWT를 삭제하는 방법으로 처리)
    public void logout() {}

    // 토큰 갱신 (만료된 Access Token을 Refresh Token으로 재발급)
    public String refreshToken(String refreshToken) {
        if (jwtProvider.validateToken(refreshToken)) {
            Long userId = jwtProvider.extractUserId(refreshToken);
            return jwtProvider.generateToken(userId);
        } else {
            throw new InvalidTokenException("유효하지 않은 토큰입니다.");
        }
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
                user.getRole().name(),  // Role은 Enum이므로 name()을 통해 String으로 변환
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

    // 자기 정보 수정 (로그인한 사용자의 정보 수정)
    public UserResponseDTO updateMyInfo(String email, UserRequestDTO userRequestDTO) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
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

        User updateUser = userRepository.save(user);
        return UserMapper.toUserResponseDTO(user);
    }

    // 비밀번호 변경 (기존 비밀번호 확인 후 새 비밀번호로 변경)
    public void changePasword(String email, String oldPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new InvalidPasswordException("현재 비밀번호가 일치하지 않습니다.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    // 회원 탈퇴 (소프트 삭제 처리)
    public void deleteUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
        // DB에서 deleted 필드를 true로 변경
        user.setDeleted(true);
        userRepository.save(user);
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

        User updatedUser = userRepository.save(user);
        return UserMapper.toUserResponseDTO(user);
    }
}
