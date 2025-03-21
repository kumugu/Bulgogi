import { UserProfile, ApiResponse, UpdateUserProfileRequest } from "@/types/userTypes";
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

// 자기 정보 수정
const updateMyInfo = async (updateData: UpdateUserProfileRequest): Promise<ApiResponse<UserProfile>> => {
    try {
        const response = await api.put<ApiResponse<UserProfile>>('/users/my-info', updateData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { getMyInfo, updateMyInfo };


