package com.bulgogi.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Objects;

public class TagCreateRequestDTO {

    @NotBlank(message = "태그명은 필수입니다")
    @Size(max = 50, message = "태그명은 50자 이내로 작성해주세요")
    private String name;

    public TagCreateRequestDTO() {}

    public TagCreateRequestDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "TagCreateRequestDTO{" +
                "name='" + name + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof TagCreateRequestDTO that)) return false;
        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(name);
    }
}
