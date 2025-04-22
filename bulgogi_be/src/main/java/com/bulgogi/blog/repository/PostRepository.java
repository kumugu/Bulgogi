package com.bulgogi.blog.repository;

import com.bulgogi.blog.model.FolderCategory;
import com.bulgogi.blog.model.Post;
import com.bulgogi.blog.model.Topic;
import com.bulgogi.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // 사용자별 게시글 조회
    Page<Post> findByUser(User user, Pageable pageable);

    // 특정 토픽별 게시글 조회
    Page<Post> findByTopic(Topic topic, Pageable pageable);

    // 특정 폴더 카테고리별 게시글 조회
    Page<Post> findByFolderCategory(FolderCategory folderCategory, Pageable pageable);

    // 태그 ID 목록으로 게시글 조회 (JPQL)
    @Query("SELECT DISTINCT p FROM Post p JOIN p.tags t WHERE t.id IN :tagIds")
    Page<Post> findByTagIds(@Param("tagIds")Set<Long> tagIds, Pageable pageable);

    // 제목으로 게시글 검색
    Page<Post> findByTitleContaining(String title, Pageable pageable);

    // 토픽과 폴더 카테고리로 게시글 조회
    Page<Post> findByTopicAndFolderCategory(Topic topic, FolderCategory folderCategory, Pageable pageable);

    // 발행된 게시글만 조회
    Page<Post> findByPublishedTrue(Pageable pageable);

    // 발행된 인기글 조회 (조회수 기준)
    Page<Post> findByPublishedTrueOrderByViewsDesc(Pageable pageable);

    // 특정 사용자의 발행된 게시글만 조회
    Page<Post> findByUserAndPublishedTrue(User user, Pageable pageable);

    // 게시글 조회수 업데이트
    @Modifying
    @Query("UPDATE Post p SET p.views = p.views + :increment WHERE p.id = :postId")
    void incrementViewCount(@Param("postId") Long postId, @Param("increment") Long incremet);

    // 태그 및 토픽으로 게시글 필터링
    @Query("SELECT p FROM Post p JOIN p.tags t WHERE p.topic.id = :topicId AND t.id IN :tagIds AND p.published = true")
    Page<Post> findByTopicIdAndTagIdsAndPublished(@Param("topicId") Long topicId, @Param("tagIds") Set<Long> tagIds, Pageable pageable);

    // 특정 사용자 게시글 전체 조회
    List<Post> findAllByUser(User user);
}
