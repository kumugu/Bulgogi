export interface MyProfile {
    email: string;
    username: string;
    profileImageUrl: string | null;  
    profileImage: string | null; 
    bio: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdatedMyBioRequest { 
    bio: string;
}

export interface ProfileImageResponse {
    profileImageUrl: string;  // API 응답에서 반환되는 profileImageUrl
}

export interface ProfileImage {
    imageKey: string;
    file: File | null;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T;
}
