package com.bulgogi.blog.service;

import com.bulgogi.blog.dto.FolderCategoryDTO;
import com.bulgogi.blog.dto.FolderCategoryRequestDTO;
import com.bulgogi.user.model.User;

import java.util.List;

public interface FolderCategoryService {

    // 폴더 생성
    FolderCategoryDTO createFolder(FolderCategoryRequestDTO folderCategoryRequestDTO, User user);

    // 하위 폴더 생성
    FolderCategoryDTO createSubFolder(FolderCategoryRequestDTO folderCategoryRequestDTO, Long parentId, User user);

    // 폴더 수정
    FolderCategoryDTO updateFolder(Long folderId, FolderCategoryRequestDTO folderCategoryRequestDTO, User user);

    // 폴더 삭제
    void deleteFolder(Long folderId, User user);

    // 폴더 ID로 조회
    FolderCategoryDTO getFolderById(Long folderId);

    // 사용자별 모든 폴더 목록 조회
    List<FolderCategoryDTO> getAllFoldersByUser(User user);

    // 사용자별 최상위 폴더만 조회
    List<FolderCategoryDTO> getRootFoldersByUser(User user);

    // 특정 폴더의 하위 폴더 목록 조회
    List<FolderCategoryDTO> getSubFolders(Long parentId);

    // 폴더 순서 변경
    List<FolderCategoryDTO> updateFoldersOrder(List<Long> folderIds, User user);

    // 폴더 계층 구조 조회
    List<FolderCategoryDTO> getFolderHierarchy(User user);

    // 폴더 이동 (다른 부모 폴더로)
    FolderCategoryDTO moveFolder(Long folderId, Long newParentId, User user);
}
