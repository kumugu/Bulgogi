package com.bulgogi.blog.dto;

public class TagRequestDTO {
    private String name;

    // Constructor
    public TagRequestDTO() {}

    public TagRequestDTO(String name) {
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
