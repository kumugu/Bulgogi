package com.bulgogi.blog.repository;

import com.bulgogi.blog.model.Tag;
import com.bulgogi.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    // 이름으로 태그 조회
    Optional<Tag> findByName(String name);

    // 여러 이름으로 태그 목록 조회
    Set<Tag> findByNameIn(List<String> tagNames);

    // 특정 사용자의 게시글에 사용된 태그 목록 (중복 제거)
    @Query("SELECT DISTINCT t FROM Tag t JOIN t.posts p WHERE p.user = :user")
    List<Tag> findTagsByAuthor(@Param("user") User user);

    // 가장 많이 사용된 태그 Top N 조회
    @Query(value = "SELECT t.* FROM tags t " +
            "JOIN post_tags pt ON t.id = pt.tag_id " +
            "GROUP BY t.id " +
            "ORDER BY COUNT(pt.post_id) DESC " +
            "LIMIT :limit", nativeQuery = true)
    List<Tag> findMostUsedTags(@Param("limit") int limit);


    // 태그 존재 여부 확인
    boolean existsByName(String name);
}