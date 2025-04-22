package com.bulgogi.blog.repository;

import org.springframework.stereotype.Repository;

// Redis 관련 Repository 인터페이스 (조회수 관리)
@Repository
public interface PostViewCountRepository {

    /**
     * 게시글 조회수 증가
     * @param postId 게시글 ID
     * @return 증가 후 조회수
     */
    Long incrementViewCount(Long postId);

    /**
     * 게시글 현재 조회수 조회
     * @param postId 게시글 ID
     * @return 조회수
     */
    Long getViewCount(Long postId);

    /**
     * 모든 게시글 조회수 데이터 가져오기
     * @return postId를 키로, 조회수를 값으로 하는 맵
     */
    java.util.Map<Long, Long> getAllViewCounts();

    /**
     * 게시글 조회수 Redis에서 삭제
     * @param postId 게시글 ID
     */
    void deleteViewCount(Long postId);
}
