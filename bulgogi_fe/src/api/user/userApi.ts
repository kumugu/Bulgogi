import { MyProfile, ApiResponse, UpdatedUserBioRequest, UpdateUserProfileImageRequest } from "@/types/user/userTypes";
import { api } from "../axios";


// 자기 정보 조회
const getMyInfo = async (): Promise<ApiResponse<MyProfile>> => {
    try {
        const response = await api.get<ApiResponse<MyProfile>>('/users/my-info');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 자기 정보 수정 (bio)
const updateMyBio = async (updateData: UpdatedUserBioRequest): Promise<ApiResponse<MyProfile>> => {
    try {
        const response = await api.put<ApiResponse<MyProfile>>(`/users/my-info/bio`, updateData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 자기 정보 수정 (profileImage)
const updateMyProfileImage = async (updateData: UpdateUserProfileImageRequest): Promise<ApiResponse<MyProfile>> => {
    try {
        const response = await api.put<ApiResponse<MyProfile>>(`/users/my-info/profileImage`, updateData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export { getMyInfo, updateMyBio, updateMyProfileImage };