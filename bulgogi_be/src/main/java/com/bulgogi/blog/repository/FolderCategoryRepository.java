package com.bulgogi.blog.repository;

import com.bulgogi.blog.model.FolderCategory;
import com.bulgogi.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FolderCategoryRepository extends JpaRepository<FolderCategory, Long> {

    // 사용자별 폴더 목록 조회
    List<FolderCategory> findByUser(User user);

    // 사용자별 최상위 폴더만 조회 (부모 폴더가 없는 폴더)
    List<FolderCategory> findByUserAndParentIsNull(User user);

    // 특정 부모 폴더의 하위 폴더 목록 조회
    List<FolderCategory> findByParent(FolderCategory parent);

    // 사용자와 폴더명으로 조회
    Optional<FolderCategory> findByUserAndName(User user, String name);

    // 사용자별 폴더 출력 순서대로 조회
    List<FolderCategory> findByUserOrderByDisplayOrderAsc(User user);

    // 폴더 계층 구조 쿼리 (재귀적으로 하위 폴더 모두 조회)
    @Query("SELECT f FROM FolderCategory f WHERE f.user = :user ORDER BY CASE WHEN f.parent IS NULL THEN 0 ELSE 1 END, f.displayOrder ASC")
    List<FolderCategory> findAllByUserWithHierarchy(@Param("user") User user);
}
