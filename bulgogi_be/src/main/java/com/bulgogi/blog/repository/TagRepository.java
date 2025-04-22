package com.bulgogi.blog.repository;

import com.bulgogi.blog.model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    // 태그명으로 검색
    Optional<Tag> findByName(String name);

    // 태그명 중복 체크
    boolean existsByName(String name);

    // 태그명 유사검색 (자동완성용)
    List<Tag> findByNameContaining(String query);

    // 태그명 유사검색 (페이징 포함)
    Page<Tag> findByNameContaining(String query, Pageable pageable);

    // 인기 태그 목록 조회 (사용 게시글 수 기준)
    @Query("SELECT t FROM Tag t JOIN t.posts p GROUP BY t ORDER BY COUNT(p) DESC")
    Page<Tag> findPopularTags(Pageable pageable);

    // 여러 태그명으로 태그 목록 조회
    List<Tag> findByNameIn(Set<String> tagNames);

    // 여러 태그 ID로 태그 목록 조회
    List<Tag> findByIdIn(Set<Long> tagIds);

    List<Tag> findByNameContainingIgnoreCase(String query);

}
