package com.bulgogi.blog.mapper;

import com.bulgogi.blog.dto.TopicDTO;
import com.bulgogi.blog.model.Topic;
import org.springframework.stereotype.Component;

@Component
public class TopicMapper {

    public TopicDTO toDTO(Topic topic) {
        return new TopicDTO(
                topic.getId(),
                topic.getName(),
                topic.getDescription(),
                topic.getDisplayOrder(),
                topic.isActive()
        );
    }

    public Topic toEntity(TopicDTO topicDTO) {
        Topic topic = new Topic();
        topic.setName(topicDTO.getName());
        topic.setDescription(topicDTO.getDescription());
        topic.setDisplayOrder(topicDTO.getDisplayOrder());
        topic.setActive(topicDTO.isActive());
        return topic;
    }
}
