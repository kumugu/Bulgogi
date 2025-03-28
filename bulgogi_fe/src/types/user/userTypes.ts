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

export interface ProfileImage {
    image: string;
    file: File | null;
}

export interface ProfileImageListProps {
    onSelect: (image: string, file: File | null) => void;
    selectedImage: string | null;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}
