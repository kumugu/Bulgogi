package com.bulgogi.blog.controller;

import com.bulgogi.common.response.ApiResponse;
import com.bulgogi.blog.dto.FolderCategoryDTO;
import com.bulgogi.blog.dto.FolderCategoryRequestDTO;
import com.bulgogi.blog.service.FolderCategoryService;
import com.bulgogi.user.model.User;
import com.bulgogi.user.security.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog/folders")
public class FolderCategoryController {

    private final FolderCategoryService folderCategoryService;

    @Autowired
    public FolderCategoryController(FolderCategoryService folderCategoryService) {
        this.folderCategoryService = folderCategoryService;
    }

    /**
     * 폴더 생성
     */
    @PostMapping
    public ResponseEntity<ApiResponse<FolderCategoryDTO>> createFolder(
            @Valid @RequestBody FolderCategoryRequestDTO requestDTO,
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        User currentUser = customUserDetails.getUser();
        FolderCategoryDTO folderDTO = folderCategoryService.createFolder(requestDTO, currentUser);
        return new ResponseEntity<>(
                ApiResponse.success("폴더가 성공적으로 생성되었습니다.", folderDTO),
                HttpStatus.CREATED
        );
    }

    /**
     * 하위 폴더 생성
     */
    @PostMapping("/{parentId}/subfolders")
    public ResponseEntity<ApiResponse<FolderCategoryDTO>> createSubFolder(
            @PathVariable Long parentId,
            @Valid @RequestBody FolderCategoryRequestDTO requestDTO,
            @AuthenticationPrincipal User currentUser) {

        FolderCategoryDTO folderDTO = folderCategoryService.createSubFolder(requestDTO, parentId, currentUser);
        return new ResponseEntity<>(
                ApiResponse.success("하위 폴더가 성공적으로 생성되었습니다.", folderDTO),
                HttpStatus.CREATED
        );
    }

    /**
     * 폴더 수정
     */
    @PutMapping("/{folderId}")
    public ResponseEntity<ApiResponse<FolderCategoryDTO>> updateFolder(
            @PathVariable Long folderId,
            @Valid @RequestBody FolderCategoryRequestDTO requestDTO,
            @AuthenticationPrincipal User currentUser) {

        FolderCategoryDTO folderDTO = folderCategoryService.updateFolder(folderId, requestDTO, currentUser);
        return ResponseEntity.ok(
                ApiResponse.success("폴더가 성공적으로 수정되었습니다.", folderDTO)
        );
    }

    /**
     * 폴더 삭제
     */
    @DeleteMapping("/{folderId}")
    public ResponseEntity<ApiResponse<Void>> deleteFolder(
            @PathVariable Long folderId,
            @AuthenticationPrincipal User currentUser) {

        folderCategoryService.deleteFolder(folderId, currentUser);
        return ResponseEntity.ok(
                ApiResponse.success("폴더가 성공적으로 삭제되었습니다.", null)
        );
    }

    /**
     * 폴더 ID로 조회
     */
    @GetMapping("/{folderId}")
    public ResponseEntity<ApiResponse<FolderCategoryDTO>> getFolderById(
            @PathVariable Long folderId) {

        FolderCategoryDTO folderDTO = folderCategoryService.getFolderById(folderId);
        return ResponseEntity.ok(
                ApiResponse.success(folderDTO)
        );
    }

    /**
     * 사용자별 모든 폴더 목록 조회
     */
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<FolderCategoryDTO>>> getAllFoldersByUser(
            @AuthenticationPrincipal User currentUser) {

        List<FolderCategoryDTO> folders = folderCategoryService.getAllFoldersByUser(currentUser);
        return ResponseEntity.ok(
                ApiResponse.success(folders)
        );
    }

    /**
     * 사용자별 최상위 폴더만 조회
     */
    @GetMapping("/root")
    public ResponseEntity<ApiResponse<List<FolderCategoryDTO>>> getRootFoldersByUser(
            @AuthenticationPrincipal User currentUser) {

        List<FolderCategoryDTO> rootFolders = folderCategoryService.getRootFoldersByUser(currentUser);
        return ResponseEntity.ok(
                ApiResponse.success(rootFolders)
        );
    }

    /**
     * 특정 폴더의 하위 폴더 목록 조회
     */
    @GetMapping("/{parentId}/subfolders")
    public ResponseEntity<ApiResponse<List<FolderCategoryDTO>>> getSubFolders(
            @PathVariable Long parentId) {

        List<FolderCategoryDTO> subFolders = folderCategoryService.getSubFolders(parentId);
        return ResponseEntity.ok(
                ApiResponse.success(subFolders)
        );
    }

    /**
     * 폴더 순서 변경
     */
    @PutMapping("/order")
    public ResponseEntity<ApiResponse<List<FolderCategoryDTO>>> updateFoldersOrder(
            @RequestBody List<Long> folderIds,
            @AuthenticationPrincipal User currentUser) {

        List<FolderCategoryDTO> updatedFolders = folderCategoryService.updateFoldersOrder(folderIds, currentUser);
        return ResponseEntity.ok(
                ApiResponse.success("폴더 순서가 성공적으로 변경되었습니다.", updatedFolders)
        );
    }

    /**
     * 폴더 계층 구조 조회
     */
    @GetMapping("/hierarchy")
    public ResponseEntity<ApiResponse<List<FolderCategoryDTO>>> getFolderHierarchy(
            @AuthenticationPrincipal User currentUser) {

        List<FolderCategoryDTO> folderHierarchy = folderCategoryService.getFolderHierarchy(currentUser);
        return ResponseEntity.ok(
                ApiResponse.success(folderHierarchy)
        );
    }

    /**
     * 폴더 이동 (다른 부모 폴더로)
     */
    @PutMapping("/{folderId}/move/{newParentId}")
    public ResponseEntity<ApiResponse<FolderCategoryDTO>> moveFolder(
            @PathVariable Long folderId,
            @PathVariable Long newParentId,
            @AuthenticationPrincipal User currentUser) {

        FolderCategoryDTO movedFolder = folderCategoryService.moveFolder(folderId, newParentId, currentUser);
        return ResponseEntity.ok(
                ApiResponse.success("폴더가 성공적으로 이동되었습니다.", movedFolder)
        );
    }
}