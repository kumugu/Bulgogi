import { api } from "../axios";
import { AdminUpdateUserRequest, AdminUpdateUserResponse, ApiAdimResponse } from "@/types/users/adminTypes";


// 다른 사용자 정보 수정 (admin)
const adminUpdateUserInfo = async (tartgetId: number, userData: AdminUpdateUserRequest): Promise<ApiAdimResponse<AdminUpdateUserResponse>> => {
    try {
        const response = await api.put<ApiAdimResponse<AdminUpdateUserResponse>>(`admin/users/{targetUserId}/update`, userData);
        return response.data;
    } catch (error) {
        console.error("사용자 정보 수정 중 오류 발생:", error);
        throw error;
    }
};

export { adminUpdateUserInfo }