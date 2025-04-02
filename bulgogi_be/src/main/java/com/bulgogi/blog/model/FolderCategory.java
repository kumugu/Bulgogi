package com.bulgogi.blog.model;

import com.bulgogi.user.model.User;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "folder_categories",
        indexes = {
                @Index(name = "idx_folder_category_user", columnList = "user_id")
        }
)
@EntityListeners(AuditingEntityListener.class)
public class FolderCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 255)
    private String description;

    // 폴더 아이콘 또는 색상 코드
    @Column(name = "icon_code", length = 50)
    private String iconCode;

    // 표시 순서
    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "folderCategory")
    private List<Post> posts = new ArrayList<>();

    // 하위 카테고리(폴더 안의 폴더) 구조 지원
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private FolderCategory parent;

    @OneToMany(mappedBy = "parent")
    private List<FolderCategory> children = new ArrayList<>();

    // Constructor
    public FolderCategory() {}

    public FolderCategory(String name, User user) {
        this.name = name;
        this.user = user;
    }

    // 편의 메서드
    public void addChild(FolderCategory child) {
        this.children.add(child);
        child.setParent(this);
    }

    public void removeChild(FolderCategory child) {
        if (this.children.remove(child)) {
            child.setParent(null);
        }
    }

    // Getter, Setter
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIconCode() {
        return iconCode;
    }

    public void setIconCode(String iconCode) {
        this.iconCode = iconCode;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public FolderCategory getParent() {
        return parent;
    }

    public void setParent(FolderCategory parent) {
        this.parent = parent;
    }

    public List<FolderCategory> getChildren() {
        return children;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FolderCategory category = (FolderCategory) o;
        return id != null && id.equals(category.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "FolderCategory{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", user=" + (user != null ? user.getId() : null) +
                '}';
    }
}