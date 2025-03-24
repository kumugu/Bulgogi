export interface MyProfile {
    email: string;
    username: string;
    profileImage: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdatedMyBioRequest {
    bio: string;
}

export interface UpdateMyProfileImageRequest {
    profileImage: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}
