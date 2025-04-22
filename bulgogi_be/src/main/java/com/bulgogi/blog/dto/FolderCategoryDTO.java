package com.bulgogi.blog.dto;

import java.time.LocalDateTime;
import java.util.Objects;

public class FolderCategoryDTO extends AuditableDTO{

    private Long id;
    private String name;
    private Long authorId;

    public FolderCategoryDTO() {}


    public FolderCategoryDTO(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String name, Long authorId) {
        super(id, createdAt, updatedAt);
        this.id = id;
        this.name = name;
        this.authorId = authorId;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    @Override
    public String toString() {
        return "FolderCategoryDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", authorId=" + authorId +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof FolderCategoryDTO that)) return false;
        if (!super.equals(object)) return false;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(authorId, that.authorId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, name, authorId);
    }
}
