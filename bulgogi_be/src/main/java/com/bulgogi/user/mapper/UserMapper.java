package com.bulgogi.user.mapper;

import com.bulgogi.user.dto.UserRequestDTO;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.dto.UserUpdateBioRequestDTO;
import com.bulgogi.user.dto.UserUpdateProfileImageRequestDTO;
import com.bulgogi.user.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class UserMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    // Entity -> DTO 변환
    public static UserResponseDTO toUserResponseDTO(User user) {
        return modelMapper.map(user, UserResponseDTO.class);
    }

    // DTO -> Entity 변환
    public static User toUser(UserRequestDTO userRequestDTO) {
        return modelMapper.map(userRequestDTO, User.class);
    }

    // 공통 Timestamp 업데이트
    private static void updateTimestamp(User user) {
        user.setUpdatedAt(LocalDateTime.now());
    }

    // Bio 업데이트
    public static void updateBio(User user, UserUpdateBioRequestDTO bioDTO) {
        modelMapper.map(bioDTO, user);
        updateTimestamp(user);
    }

    // ProfileImage 업데이트
    public static void updateProfileImage(User user, UserUpdateProfileImageRequestDTO profileImageDTO) {
        modelMapper.map(profileImageDTO, user);
        updateTimestamp(user);
    }




}
