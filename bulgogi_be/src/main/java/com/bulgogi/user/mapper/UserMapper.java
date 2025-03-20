package com.bulgogi.user.mapper;

import com.bulgogi.user.dto.UserRequestDTO;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.dto.UserUpdateRequestDTO;
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

    // UserUpdateRequestDTO -> Entity 변환
    public static User updateToUser(UserUpdateRequestDTO userUpdateRequestDTO, User user) {
        if (userUpdateRequestDTO.getProfileImage() != null) {
            user.setProfileImage(userUpdateRequestDTO.getProfileImage());
        }
        if (userUpdateRequestDTO.getBio() != null) {
            user.setBio(userUpdateRequestDTO.getBio());
        }
        user.setUpdatedAt(LocalDateTime.now());
        return user;
    }

}
