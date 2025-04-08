package com.bulgogi.blog.service.impl;

import com.bulgogi.blog.dto.FolderCategoryDTO;
import com.bulgogi.blog.dto.FolderCategoryRequestDTO;
import com.bulgogi.common.exception.ResourceNotFoundException;
import com.bulgogi.common.exception.UnauthorizedException;
import com.bulgogi.blog.mapper.FolderCategoryMapper;
import com.bulgogi.blog.model.FolderCategory;
import com.bulgogi.blog.repository.FolderCategoryRepository;
import com.bulgogi.blog.service.FolderCategoryService;
import com.bulgogi.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FolderCategoryServiceImpl implements FolderCategoryService {

    private final FolderCategoryRepository folderCategoryRepository;
    private final FolderCategoryMapper folderCategoryMapper;

    @Autowired
    public FolderCategoryServiceImpl(FolderCategoryRepository folderCategoryRepository,
                                     FolderCategoryMapper folderCategoryMapper) {
        this.folderCategoryRepository = folderCategoryRepository;
        this.folderCategoryMapper = folderCategoryMapper;
    }

    @Override
    @Transactional
    public FolderCategoryDTO createFolder(FolderCategoryRequestDTO requestDTO, User user) {
        // 사용자별 폴더명 중복 확인
        folderCategoryRepository.findByUserAndName(user, requestDTO.getName())
                .ifPresent(folder -> {
                    throw new IllegalArgumentException("동일한 이름의 폴더가 이미 존재합니다.");
                });

        FolderCategory folderCategory = new FolderCategory();
        folderCategory.setName(requestDTO.getName());
        folderCategory.setUser(user);

        // 표시 순서 설정 (기존 폴더의 마지막 순서 + 1)
        List<FolderCategory> existingFolders = folderCategoryRepository.findByUserOrderByDisplayOrderAsc(user);
        int displayOrder = existingFolders.isEmpty() ? 0 : existingFolders.get(existingFolders.size() - 1).getDisplayOrder() + 1;
        folderCategory.setDisplayOrder(displayOrder);

        FolderCategory savedFolder = folderCategoryRepository.save(folderCategory);
        return folderCategoryMapper.toDTO(savedFolder);
    }

    @Override
    @Transactional
    public FolderCategoryDTO createSubFolder(FolderCategoryRequestDTO requestDTO, Long parentId, User user) {
        // 부모 폴더 확인
        FolderCategory parentFolder = folderCategoryRepository.findById(parentId)
                .orElseThrow(() -> new ResourceNotFoundException("상위 폴더를 찾을 수 없습니다. ID: " + parentId));

        // 부모 폴더의 소유자 확인
        if (!parentFolder.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("해당 폴더에 접근할 권한이 없습니다.");
        }

        // 같은 부모 폴더 내 동일 이름의 하위 폴더 확인
        List<FolderCategory> siblingFolders = folderCategoryRepository.findByParent(parentFolder);
        for (FolderCategory sibling : siblingFolders) {
            if (sibling.getName().equals(requestDTO.getName())) {
                throw new IllegalArgumentException("동일한 이름의 하위 폴더가 이미 존재합니다.");
            }
        }

        FolderCategory folderCategory = new FolderCategory();
        folderCategory.setName(requestDTO.getName());
        folderCategory.setUser(user);
        folderCategory.setParent(parentFolder);

        // 하위 폴더 표시 순서 설정
        int displayOrder = siblingFolders.isEmpty() ? 0 :
                siblingFolders.stream()
                        .mapToInt(FolderCategory::getDisplayOrder)
                        .max()
                        .orElse(-1) + 1;
        folderCategory.setDisplayOrder(displayOrder);

        FolderCategory savedFolder = folderCategoryRepository.save(folderCategory);
        return folderCategoryMapper.toDTO(savedFolder);
    }

    @Override
    @Transactional
    public FolderCategoryDTO updateFolder(Long folderId, FolderCategoryRequestDTO requestDTO, User user) {
        FolderCategory folderCategory = folderCategoryRepository.findById(folderId)
                .orElseThrow(() -> new ResourceNotFoundException("폴더를 찾을 수 없습니다. ID: " + folderId));

        // 폴더의 소유자 확인
        if (!folderCategory.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("해당 폴더를 수정할 권한이 없습니다.");
        }

        // 같은 레벨의 폴더 중 이름 중복 확인
        if (folderCategory.getParent() == null) {
            // 최상위 폴더인 경우
            folderCategoryRepository.findByUserAndName(user, requestDTO.getName())
                    .ifPresent(existingFolder -> {
                        if (!existingFolder.getId().equals(folderId)) {
                            throw new IllegalArgumentException("동일한 이름의 폴더가 이미 존재합니다.");
                        }
                    });
        } else {
            // 하위 폴더인 경우
            List<FolderCategory> siblingFolders = folderCategoryRepository.findByParent(folderCategory.getParent());
            for (FolderCategory sibling : siblingFolders) {
                if (sibling.getName().equals(requestDTO.getName()) && !sibling.getId().equals(folderId)) {
                    throw new IllegalArgumentException("동일한 이름의 하위 폴더가 이미 존재합니다.");
                }
            }
        }

        folderCategory.setName(requestDTO.getName());
        FolderCategory updatedFolder = folderCategoryRepository.save(folderCategory);
        return folderCategoryMapper.toDTO(updatedFolder);
    }

    @Override
    @Transactional
    public void deleteFolder(Long folderId, User user) {
        FolderCategory folderCategory = folderCategoryRepository.findById(folderId)
                .orElseThrow(() -> new ResourceNotFoundException("폴더를 찾을 수 없습니다. ID: " + folderId));

        // 폴더의 소유자 확인
        if (!folderCategory.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("해당 폴더를 삭제할 권한이 없습니다.");
        }

        // 하위 폴더가 있는지 확인하고 함께 삭제
        List<FolderCategory> childFolders = folderCategoryRepository.findByParent(folderCategory);
        folderCategoryRepository.deleteAll(childFolders);
        folderCategoryRepository.delete(folderCategory);
    }

    @Override
    @Transactional(readOnly = true)
    public FolderCategoryDTO getFolderById(Long folderId) {
        FolderCategory folderCategory = folderCategoryRepository.findById(folderId)
                .orElseThrow(() -> new ResourceNotFoundException("폴더를 찾을 수 없습니다. ID: " + folderId));
        return folderCategoryMapper.toDTO(folderCategory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FolderCategoryDTO> getAllFoldersByUser(User user) {
        List<FolderCategory> folders = folderCategoryRepository.findByUser(user);
        return folders.stream()
                .map(folderCategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<FolderCategoryDTO> getRootFoldersByUser(User user) {
        // 메서드 이름 수정 필요: findByUserAdParentIsNull -> findByUserAndParentIsNull
        // 원본 레포지토리에 오타가 있어 보임
        List<FolderCategory> rootFolders = folderCategoryRepository.findByUserAndParentIsNull(user);
        return rootFolders.stream()
                .map(folderCategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<FolderCategoryDTO> getSubFolders(Long parentId) {
        FolderCategory parentFolder = folderCategoryRepository.findById(parentId)
                .orElseThrow(() -> new ResourceNotFoundException("상위 폴더를 찾을 수 없습니다. ID: " + parentId));

        List<FolderCategory> subFolders = folderCategoryRepository.findByParent(parentFolder);
        return subFolders.stream()
                .map(folderCategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<FolderCategoryDTO> updateFoldersOrder(List<Long> folderIds, User user) {
        List<FolderCategory> folders = new ArrayList<>();

        // 모든 ID가 유효하고 사용자의 것인지 확인
        for (int i = 0; i < folderIds.size(); i++) {
            Long folderId = folderIds.get(i);
            FolderCategory folder = folderCategoryRepository.findById(folderId)
                    .orElseThrow(() -> new ResourceNotFoundException("폴더를 찾을 수 없습니다. ID: " + folderId));

            if (!folder.getUser().getId().equals(user.getId())) {
                throw new UnauthorizedException("해당 폴더의 순서를 변경할 권한이 없습니다.");
            }

            folder.setDisplayOrder(i);
            folders.add(folder);
        }

        List<FolderCategory> savedFolders = folderCategoryRepository.saveAll(folders);
        return savedFolders.stream()
                .map(folderCategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<FolderCategoryDTO> getFolderHierarchy(User user) {
        List<FolderCategory> folderHierarchy = folderCategoryRepository.findAllByUserWithHierarchy(user);
        return folderHierarchy.stream()
                .map(folderCategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public FolderCategoryDTO moveFolder(Long folderId, Long newParentId, User user) {
        FolderCategory folderToMove = folderCategoryRepository.findById(folderId)
                .orElseThrow(() -> new ResourceNotFoundException("이동할 폴더를 찾을 수 없습니다. ID: " + folderId));

        // 폴더의 소유자 확인
        if (!folderToMove.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("해당 폴더를 이동할 권한이 없습니다.");
        }

        // 순환 참조 방지 (자기 자신이나 자신의 하위 폴더로 이동하는 것 방지)
        if (folderId.equals(newParentId)) {
            throw new IllegalArgumentException("폴더를 자기 자신으로 이동할 수 없습니다.");
        }

        // 새 부모 폴더 확인
        FolderCategory newParent = folderCategoryRepository.findById(newParentId)
                .orElseThrow(() -> new ResourceNotFoundException("새 상위 폴더를 찾을 수 없습니다. ID: " + newParentId));

        // 새 부모 폴더의 소유자 확인
        if (!newParent.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("대상 폴더에 접근할 권한이 없습니다.");
        }

        // 현재 폴더가 새 부모 폴더의 상위 폴더인지 확인 (순환 참조 방지)
        FolderCategory current = newParent;
        while (current.getParent() != null) {
            if (current.getParent().getId().equals(folderId)) {
                throw new IllegalArgumentException("폴더를 자신의 하위 폴더로 이동할 수 없습니다.");
            }
            current = current.getParent();
        }

        // 같은 부모 폴더 내 동일 이름의 하위 폴더 확인
        List<FolderCategory> siblingFolders = folderCategoryRepository.findByParent(newParent);
        for (FolderCategory sibling : siblingFolders) {
            if (sibling.getName().equals(folderToMove.getName()) && !sibling.getId().equals(folderId)) {
                throw new IllegalArgumentException("대상 폴더에 동일한 이름의 폴더가 이미 존재합니다.");
            }
        }

        // 폴더 이동
        folderToMove.setParent(newParent);

        // 표시 순서 갱신
        int displayOrder = siblingFolders.isEmpty() ? 0 :
                siblingFolders.stream()
                        .mapToInt(FolderCategory::getDisplayOrder)
                        .max()
                        .orElse(-1) + 1;
        folderToMove.setDisplayOrder(displayOrder);

        FolderCategory movedFolder = folderCategoryRepository.save(folderToMove);
        return folderCategoryMapper.toDTO(movedFolder);
    }
}