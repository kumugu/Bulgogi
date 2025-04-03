package com.bulgogi.blog.model;

import com.bulgogi.user.model.User;
import jakarta.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(
        name = "posts",
        indexes = {
                @Index(name = "idx_post_created_at", columnList = "createdAt"),
                @Index(name = "idx_post_user_id", columnList = "user_id"),
                @Index(name = "idx_post_category_id", columnList = "category_id"),
                @Index(name = "idx_post_topic_id", columnList = "topic_id"),
                @Index(name = "idx_post_published_views", columnList = "published, views"),
                @Index(name = "idx_post_title", columnList = "title")
        }
)
@EntityListeners(AuditingEntityListener.class)
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @OneToOne(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private PostContent postContent;

    @Column(nullable = false)
    private Long views = 0L;

    @Column(nullable = false)
    private boolean published = false;

    @Column(nullable = false)
    private int commentCount = 0;   // 댓글 수 캐싱

    @Column(nullable = false)
    private int likeCount = 0;  // 좋아요 수 캐싱

    @Version
    private Long version;   // 낙관적 락 구현

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private List<Comment> comments = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_category_id")
    private FolderCategory folderCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "post_tags",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Tag> tags = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<PostImage> images = new ArrayList<>();


    // 편의 메서드
    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setPost(this);
        this.commentCount++;    // 댓글 카운트 증가
    }

    public void removeComment(Comment comment) {
        if (comments.remove(comment)) {
            comment.setPost(null);
            this.commentCount--;    // 댓글 카운트 감소
        }
    }

    public void addTag(Tag tag) {
        tags.add(tag);
        tag.getPosts().add(this);
    }

    public void removeTag(Tag tag) {
        if (tags.remove(tag)) {
            tag.getPosts().remove(this);
        }
    }

    public void addImage(PostImage image) {
        images.add(image);
        image.setPost(this);
    }

    public void removeImage(PostImage image) {
        if (images.remove(image)) {
            image.setPost(null);
        }
    }

    /**
     * 게시글 발행 상태 변경
     * @Param published 발행 여부
     */
    public void updatePublishStatus(boolean published) {
        this.published = published;
    }

    // Constructor
    public Post() {}

    // Builder 패턴을 위한 private 생성자
    private Post(Builder builder) {
        this.title = builder.title;
        this.postContent = builder.postContent;
        this.views = builder.views;
        this.published = builder.published;
        this.user = builder.user;
        this.topic = builder.topic;
        this.folderCategory = builder.folderCategory;
    }

    // Builder 클래스
    public static class Builder {
        // 필수 파라미터
        private final String title;
        private final PostContent postContent;
        private final User user;
        private final Topic topic;

        // 선택적 파라미터 - 기본값으로 초기화
        private Long views = 0L;
        private boolean published = false;
        private FolderCategory folderCategory = null;

        public Builder(String title, PostContent postContent, User user, Topic topic) {
            this.title = title;
            this.postContent = postContent;
            this.user = user;
            this.topic = topic;
        }

        public Builder views(Long views) {
            this.views = views;
            return  this;
        }

        public Builder published(boolean published) {
            this.published = published;
            return this;
        }

        public Builder folderCategory(FolderCategory folderCategory) {
            this.folderCategory = folderCategory;
            return this;
        }

        public Post build() {
            return new Post(this);
        }
    }

    // Getter, Setter
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public PostContent getpostContent() {
        return postContent;
    }

    public void setpostContent(PostContent postContent) {
        this.postContent = postContent;
    }

    public Long getViews() {
        return views;
    }

    public void setViews(Long views) {
        this.views = views;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public Long getVersion() {
        return version;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
        this.commentCount = comments.size();  // 댓글 카운트 동기화
    }

    public FolderCategory getFolderCategory() {
        return folderCategory;
    }

    public void setFolderCategory(FolderCategory folderCategory) {
        this.folderCategory = folderCategory;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<PostImage> getImages() {
        return images;
    }

    public void setImages(List<PostImage> images) {
        this.images = images;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return id != null && id.equals(post.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}