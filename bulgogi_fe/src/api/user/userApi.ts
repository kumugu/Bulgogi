import { MyProfile, ApiResponse, UpdatedMyBioRequest, UpdateMyProfileImageRequest } from "@/types/user/userTypes";
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
const updateMyBio = async (updateData: UpdatedMyBioRequest): Promise<ApiResponse<MyProfile>> => {
    try {
        const response = await api.put<ApiResponse<MyProfile>>(`/users/my-info/bio`, updateData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 자기 정보 수정 (profileImage 가져오기)
const getProfileImageList = async (): Promise<string[]> => {
    try {
        const response = await api.get<string[]>('/users/images/profile-options');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 자기 정보 수정 (profileImage)
const updateMyProfileImage = async (updateData: UpdateMyProfileImageRequest | FormData): Promise<ApiResponse<MyProfile>> => {
    try {
        const response = await api.put<ApiResponse<MyProfile>>(`/users/my-info/profileImage`, updateData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { getMyInfo, updateMyBio, getProfileImageList, updateMyProfileImage };