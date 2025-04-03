package com.bulgogi.blog.repository;

import com.bulgogi.blog.model.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

    // 토픽명으로 조회
    Optional<Topic> findByName(String name);

    // 토픽명 중복 체크
    boolean existsByName(String name);

    // 활성화된 토픽만 조회
    List<Topic> findByActiveTrue();

    // 활성회된 토픽만 조회 (페이징)
    Page<Topic> findByActiveTrue(Pageable pageable);

    // 토픽명으로 검색
    List<Topic> findByNameContaining(String name);

    // 표시순서 기준 정렬
    List<Topic> findByActiveTrueOrderByDisplayOrderAsc();

    // 인기 토픽 조회 (게시글 수 기준)
    @Query("SELECT t FROM Topic t JOIN t.posts p GROUP BY t ORDER BY COUNT(p) DESC")
    List<Topic> findPopularTopics(Pageable pageable);
}
