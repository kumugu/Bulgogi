package com.bulgogi.blog.dto;

public class TagResponseDTO {
    private Long id;
    private String name;

    // Constructor
    public TagResponseDTO() {}

    public TagResponseDTO(Long id, String name) {
        this.id = id;
        this.name = name;
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
