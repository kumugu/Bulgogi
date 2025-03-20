export interface UserProfile {
    email: string;
    username: string;
    profileImage: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateUserProfileRequest {
    bio: string;
    profileImage: string;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface DeleteUserRequest {
    confirmPassword: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}