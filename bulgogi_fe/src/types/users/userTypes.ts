export interface UserProfile {
    email: string;
    username: string;
    profileImage: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdatedUserBioRequest {
    bio: string;
}

export interface UpdateUserProfileImageRequest {
    profileImage: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}
