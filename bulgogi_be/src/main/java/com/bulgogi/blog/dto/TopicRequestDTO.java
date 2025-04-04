package com.bulgogi.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Objects;

public class TopicRequestDTO {
    @NotBlank(message = "토픽명은 필수입니다")
    @Size(max = 100, message = "토픽명은 100자 이내로 작성해주세요")
    private String name;
    private String description;
    private Integer displayOrder;
    private Boolean active;

    public TopicRequestDTO() {}

    public TopicRequestDTO(String name, String description, Integer displayOrder, Boolean active) {
        this.name = name;
        this.description = description;
        this.displayOrder = displayOrder;
        this.active = active;
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

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @Override
    public String toString() {
        return "TopicRequestDTO{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", displayOrder=" + displayOrder +
                ", active=" + active +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof TopicRequestDTO that)) return false;
        return Objects.equals(name, that.name) && Objects.equals(description, that.description) && Objects.equals(displayOrder, that.displayOrder) && Objects.equals(active, that.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, description, displayOrder, active);
    }
}
