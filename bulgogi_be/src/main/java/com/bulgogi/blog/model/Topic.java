package com.bulgogi.blog.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(
        name = "topics",
        indexes = {
                @Index(name = "idx_topic_name", columnList = "name"),
                @Index(name = "idx_topic_active", columnList = "active")
        }
)
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    // 정렬순서
    @Column(name = "display_order")
    private Integer displayOrder = 0;

    // 활성화 여부
    @Column(nullable = false)
    private boolean active = true;

    @OneToMany(mappedBy = "topic")
    private List<Post> posts = new ArrayList<>();

    public Topic() {}

    public Topic(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Topic)) return false;
        Topic topic = (Topic) o;
        return id != null && id.equals(topic.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
