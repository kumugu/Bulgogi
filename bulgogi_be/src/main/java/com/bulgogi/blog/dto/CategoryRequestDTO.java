package com.bulgogi.blog.dto;

public class CategoryRequestDTO {
    private String name;

    // Constructor
    public CategoryRequestDTO() {}

    public CategoryRequestDTO(String name) {
        this.name = name;
    }

    // Getter, Setter

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
