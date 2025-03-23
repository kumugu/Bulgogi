export interface AdminUpdateUserRequest {
    username?: string;
    bio?: string;
    profileImage?: string;
    deleted?: boolean;
}

export interface AdminUpdateUserResponse {
    id: number;
    username: string;
    bio: string;
    profileImage: string;
    role: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface ApiAdimResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}