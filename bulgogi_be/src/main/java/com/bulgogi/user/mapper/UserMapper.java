package com.bulgogi.user.mapper;

import com.bulgogi.user.dto.UserRequestDTO;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.dto.UserUpdateBioRequestDTO;
import com.bulgogi.user.dto.UserUpdateProfileImageRequestDTO;
import com.bulgogi.user.model.User;
import com.bulgogi.user.service.S3Service;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
@Component
public class UserMapper {

    private final ModelMapper modelMapper;
    private final S3Service s3Service;

    @Autowired
    public UserMapper(S3Service s3Service) {
        this.s3Service = s3Service;
        this.modelMapper = new ModelMapper();
        // 프로필 이미지 URL 변환 커스텀 매핑 설정
        this.modelMapper.addMappings(new PropertyMap<User, UserResponseDTO>() {
            @Override
            protected void configure() {
                using(ctx -> {
                    String relativePath = (String) ctx.getSource();
                    return (relativePath == null || relativePath.isEmpty())
                            ? ""
                            : s3Service.getFileUrl(relativePath);
                }).map(source.getProfileImage(), destination.getProfileImageUrl());
            }
        });
    }

    public UserResponseDTO toUserResponseDTO(User user) {
        return modelMapper.map(user, UserResponseDTO.class);
    }

    public User toUser(UserRequestDTO userRequestDTO) {
        return modelMapper.map(userRequestDTO, User.class);
    }

    // 공통 Timestamp 업데이트
    private void updateTimestamp(User user) {
        user.setUpdatedAt(LocalDateTime.now());
    }

    // Bio 업데이트 (static -> instance 메소드로 변경)
    public void updateBio(User user, UserUpdateBioRequestDTO bioDTO) {
        modelMapper.map(bioDTO, user);
        updateTimestamp(user);
    }

    // ProfileImage 업데이트 (static -> instance 메소드로 변경)
    public void updateProfileImage(User user, UserUpdateProfileImageRequestDTO profileImageDTO) {
        modelMapper.map(profileImageDTO, user);
        updateTimestamp(user);
    }
}
