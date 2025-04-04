package com.bulgogi.blog.dto;

import java.time.LocalDateTime;
import java.util.Objects;

public class TopicDTO extends AuditableDTO{

    private Long id;
    private String name;
    private String description;
    private Integer displayOrder;
    private boolean active;

    public TopicDTO() {}

    public TopicDTO(Long id, String name, String description, Integer displayOrder, boolean active) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.displayOrder = displayOrder;
        this.active = active;
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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Override
    public String toString() {
        return "TopicDTO{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", displayOrder=" + displayOrder +
                ", active=" + active +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof TopicDTO topicDTO)) return false;
        if (!super.equals(object)) return false;
        return active == topicDTO.active && Objects.equals(name, topicDTO.name) && Objects.equals(description, topicDTO.description) && Objects.equals(displayOrder, topicDTO.displayOrder);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, description, displayOrder, active);
    }
}
