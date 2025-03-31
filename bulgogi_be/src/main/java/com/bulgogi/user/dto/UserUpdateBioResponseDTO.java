package com.bulgogi.user.dto;

public class UserUpdateBioResponseDTO {
    private String bio;

    // 생성자
    public UserUpdateBioResponseDTO() {}

    public UserUpdateBioResponseDTO(String bio) {
        this.bio = bio;
    }

    // Getter, Setter
    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
