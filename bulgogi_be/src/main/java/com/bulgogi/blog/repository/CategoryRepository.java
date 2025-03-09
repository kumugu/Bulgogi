package com.bulgogi.blog.repository;

import com.bulgogi.blog.model.Category;
import com.bulgogi.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

    // 이름으로 카테고리 조회
    Optional<Category> findByName(String name);

    // 특정 사용자가 작성한 게시글이 속한 카테고리 목록(중복제거)
    @Query("SELECT DISTINCT c FROM Category c JOIN c.posts p WHERE p.author = :author")
    List<Category> findCategoriesByUser(@Param("user") User user);

    // 특정 카테고리에 속한 게시글 수 조회
    @Query("SELECT COUNT(p) FROM Post p WHERE p.category.id = :categoryId")
    Long countPostsByCategoryId(@Param("categoryId") Long categoryId);

    // 카테고리 존재 여부 확인
    boolean existsByName(String name);
}
