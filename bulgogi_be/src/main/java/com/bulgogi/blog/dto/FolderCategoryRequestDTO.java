package com.bulgogi.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Objects;

public class FolderCategoryRequestDTO {

    @NotBlank(message = "폴더명은 필수입니다")
    @Size(max = 100, message = "폴더명은 100자 이내로 작성해주세요")
    private String name;

    public FolderCategoryRequestDTO() {}

    public FolderCategoryRequestDTO(String name) {
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
        return "FolderCategoryRequestDTO{" +
                "name='" + name + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof FolderCategoryRequestDTO that)) return false;
        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(name);
    }
}
