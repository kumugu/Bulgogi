export interface RegisterRequest {
    email: string;
    password: string;
    username: string;
    profileImage?: string;
    bio: string;
    role: "USER" | "ADMIN";
}

export interface RegisterResponse {
    id: number;
    email: string;
    username: string;
    profileImage: string;
    bio: string;
    role: "USER" | "ADMIN";
    createdAt: string;
    updatedAt: string;
}

export interface RegisterFormData {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface DeleteAccountRequest {
    confirmPassword: string;
}

export interface AccountApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}
