export interface UserProfile {
    userId: number;
    email: string;
    username: string;
    profileImage: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateUserProfileRequest {
    userId: number;
    username: string;
    bio: string;
    profileImage: string;
}

export interface ChangePasswordRequest {
    userId: number;
    oldPassword: string;
    newPassword: string;
}

export interface DeleteUserRequest {
    userId: number;
    password: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}