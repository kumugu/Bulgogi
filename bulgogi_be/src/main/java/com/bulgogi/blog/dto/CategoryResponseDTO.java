package com.bulgogi.blog.dto;

public class CategoryResponseDTO {
    private Long id;
    private String name;

    // Constructor
    public CategoryResponseDTO() {}

    public CategoryResponseDTO(Long id) {
        this.id = id;
    }

    // Getter, Setter

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
}
