package com.bulgogi.blog.dto;

import java.util.List;
import java.util.Objects;

public class PageResponseDTO<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean first;
    private boolean last;

    public PageResponseDTO() {}

    public PageResponseDTO(List<T> content, int page, int size, long totalElements, int totalPages, boolean first, boolean last) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.first = first;
        this.last = last;
    }

    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public boolean isFirst() {
        return first;
    }

    public void setFirst(boolean first) {
        this.first = first;
    }

    public boolean isLast() {
        return last;
    }

    public void setLast(boolean last) {
        this.last = last;
    }

    @Override
    public String toString() {
        return "PageResponseDTO{" +
                "content=" + content +
                ", page=" + page +
                ", size=" + size +
                ", totalElements=" + totalElements +
                ", totalPages=" + totalPages +
                ", first=" + first +
                ", last=" + last +
                '}';
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof PageResponseDTO<?> that)) return false;
        return page == that.page && size == that.size && totalElements == that.totalElements && totalPages == that.totalPages && first == that.first && last == that.last && Objects.equals(content, that.content);
    }

    @Override
    public int hashCode() {
        return Objects.hash(content, page, size, totalElements, totalPages, first, last);
    }
}
