package com.bulgogi.user.mapper;

import com.bulgogi.user.dto.UserRequestDTO;
import com.bulgogi.user.dto.UserResponseDTO;
import com.bulgogi.user.model.User;
import com.bulgogi.user.service.S3Service;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
@Component
public class UserMapper {

    private final ModelMapper modelMapper;
    private final S3Service s3Service;
    private static final Logger logger = (Logger) LoggerFactory.getLogger(UserMapper.class);

    @Autowired
    public UserMapper(S3Service s3Service) {
        this.s3Service = s3Service;
        this.modelMapper = new ModelMapper();
    }

    @PostConstruct
    public void init() {
        this.modelMapper.addMappings(new PropertyMap<User, UserResponseDTO>() {
            @Override
            protected void configure() {
                using(ctx -> {
                    String relativePath = (String) ctx.getSource();
                    return (relativePath == null || relativePath.isEmpty())
                            ? s3Service.getFileUrl(null)
                            : s3Service.getFileUrl(relativePath);
                }).map(source.getProfileImage(), destination.getProfileImageUrl());
            }
        });
    }

    public UserResponseDTO toUserResponseDTO(User user) {
        logger.debug("Profile image in User object: {}", user.getProfileImage());
        return modelMapper.map(user, UserResponseDTO.class);
    }

    public User toUser(UserRequestDTO userRequestDTO) {
        return modelMapper.map(userRequestDTO, User.class);
    }

}
