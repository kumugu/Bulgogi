export interface QueueItem {
    resolve: Function;
    reject: Function;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken?: string;
}

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
