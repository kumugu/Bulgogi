package com.bulgogi.blog.dto;

import java.util.Objects;

public class TagDTO {

    private Long id;
    private String name;

    public TagDTO() {}

    public TagDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    @Override
    public String toString() {
        return "TagDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof TagDTO tagDTO)) return false;
        return Objects.equals(id, tagDTO.id) && Objects.equals(name, tagDTO.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
