package com.bulgogi.blog.mapper;

import com.bulgogi.blog.dto.FolderCategoryDTO;
import com.bulgogi.blog.model.FolderCategory;
import com.bulgogi.user.model.User;
import org.springframework.stereotype.Component;

@Component
public class FolderCategoryMapper {

    public FolderCategoryDTO toDTO(FolderCategory folderCategory) {
        return new FolderCategoryDTO(
                folderCategory.getId(),
                folderCategory.getCreatedAt(),
                null,
                folderCategory.getName(),
                folderCategory.getUser().getId()
        );
    }

    public FolderCategory toEntity(FolderCategoryDTO folderCategoryDTO, User user) {
        FolderCategory folderCategory = new FolderCategory();
        folderCategory.setName(folderCategoryDTO.getName());
        folderCategory.setUser(user);
        return folderCategory;
    }
}
