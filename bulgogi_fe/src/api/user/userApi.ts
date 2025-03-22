import { UserProfile, ApiResponse, UpdatedUserBioRequest, UpdateUserProfileImageRequest } from "@/types/users/userTypes";
import { api } from "../axios";


// 자기 정보 조회
const getMyInfo = async (): Promise<ApiResponse<UserProfile>> => {
    try {
        const response = await api.get<ApiResponse<UserProfile>>('/users/my-info');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 자기 정보 수정 (bio)
const updateMyBio = async (updateData: UpdatedUserBioRequest): Promise<ApiResponse<UserProfile>> => {
    try {
        const response = await api.put<ApiResponse<UserProfile>>(`/users/my-info/bio`, updateData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 자기 정보 수정 (profileImage)
const updateMyProfileImage = async (updateData: UpdateUserProfileImageRequest): Promise<ApiResponse<UserProfile>> => {
    try {
        const response = await api.put<ApiResponse<UserProfile>>(`/users/my-info/profileImage`, updateData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export { getMyInfo, updateMyBio, updateMyProfileImage };