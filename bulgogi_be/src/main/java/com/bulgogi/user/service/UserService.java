package com.bulgogi.user.service;

import com.bulgogi.user.dto.*;
import com.bulgogi.user.exception.*;
import com.bulgogi.user.mapper.UserMapper;
import com.bulgogi.user.model.User;
import com.bulgogi.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, S3Service s3Service, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.s3Service = s3Service;
        this.userMapper = userMapper;
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
       User user = userRepository.findByEmail(email)
               .orElseThrow(() -> new UserNotFoundException("해당 이메일을 가진 사용자를 찾을 수 없습니다."));
       UserResponseDTO dto = userMapper.toUserResponseDTO(user);
       dto.setProfileImageUrl(s3Service.getFileUrl(user.getProfileImage()));
       return dto;
    }

    // 사용자명으로 사용자 조회 (프로필 검색 시 사용)
    public UserResponseDTO getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("해당 이름을 가진 사용자를 찾을 수 없습니다."));
        UserResponseDTO dto = userMapper.toUserResponseDTO(user);
        dto.setProfileImageUrl(s3Service.getFileUrl(user.getProfileImage()));
        return dto;
    }

    // 다른 사용자 정보 조회 (username 조회: 외부 검색 용도, 공개된 정보 조회)
    public UserResponseDTO getUserInfo(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("해당 사용자를 찾을 수 없습니다."));
        UserResponseDTO dto = userMapper.toUserResponseDTO(user);
        dto.setProfileImageUrl(s3Service.getFileUrl(user.getProfileImage()));
        return dto;
    }

    // 특정 유저 정보 조회 (userId 조회: 내부 사용 용도, 공개된 정보 조회)
    public UserResponseDTO getUserInfoById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("해당 ID의 사용자를 찾을 수 없습니다."));
        UserResponseDTO dto = userMapper.toUserResponseDTO(user);
        dto.setProfileImageUrl(s3Service.getFileUrl(user.getProfileImage()));
        return dto;
    }

    // 자기 정보 조회 (로그인한 사용자의 정보 조회)
    public UserResponseDTO getMyInfo(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
        // 인스턴스 기반 매퍼를 사용하여 DTO 생성
        UserResponseDTO dto = userMapper.toUserResponseDTO(user);
        // 기존에 저장된 상대 경로를 절대 URL로 변환해서 DTO에 설정
        dto.setProfileImageUrl(s3Service.getFileUrl(user.getProfileImage()));
        return dto;
    }


    // 자기 정보 수정 - Bio
    @Transactional
    public UserUpdateBioResponseDTO updateBio(Long userId, UserUpdateBioRequestDTO bioRequest) {
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
        return new UserUpdateBioResponseDTO(user.getBio());
    }


    // 자기 정보 수정 - profileImage 파일 업로드
    @Transactional
    public UserResponseDTO uploadAndSetProfileImage(Long userId, MultipartFile file) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        try {
            // 기존 이미지 삭제 (기본 이미지가 아닌 경우)
            if (user.getProfileImage() != null && !user.getProfileImage().contains("default-profile")) {
                s3Service.deleteFile(user.getProfileImage());
            }

            // 새 이미지 업로드 후 파일명 저장
            String newFileName = s3Service.uploadFile(file);
            user.setProfileImage(newFileName);
            user.setUpdatedAt(LocalDateTime.now());

            // DB에 최신 사용자 정보 저장 (반환된 엔티티 사용)
            User updateUser = userRepository.save(user);
            UserResponseDTO dto = userMapper.toUserResponseDTO(updateUser);
            dto.setProfileImageUrl(s3Service.getFileUrl(updateUser.getProfileImage()));
            return dto;
        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 중 오류 발생", e);
        }
    }


    // 자기 정보 수정 - ImageKey 업데이트
    public void updateProfileImage(Long userId, String imageKey) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        user.setProfileImage(imageKey);
        userRepository.save(user);
    }


    // 자기 정보 삭제 - profileImage 삭제
    public void removeProfileImage(Long userId) {
        // 사용자 정보 가져오기
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // s3에서 이미지 파일 삭제
        String profileImageFileName = user.getProfileImage();

        if (profileImageFileName != null && !profileImageFileName.isEmpty()) {
            // s3에서 이미지 파일 삭제
            s3Service.deleteFile(profileImageFileName);

            // 사용자 정보에서 프로필 이미지 경로 초기화
            user.setProfileImage(null);
            userRepository.save(user);
        } else {
            throw new RuntimeException("프로필 이미지가 없습니다.");
        }
    }
}
