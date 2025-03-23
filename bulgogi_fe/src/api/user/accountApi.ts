import { ChangePasswordRequest, DeleteUserRequest } from "@/types/users/accountTypes";
import { ApiResponse } from "@/types/users/userTypes";
import { api } from "../axios";


// 비밀번호 변경
const changePassword = async (passwordData: ChangePasswordRequest): Promise<ApiResponse<void>> => {
    try {
        const response = await api.put<ApiResponse<void>>('/users/change-password', passwordData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 비밀번호 변경 처리 API 함수
const handlePasswordChangeAPI = async (passwordData: { oldPassword: string; newPassword: string }) => {
    try {
        await changePassword(passwordData);
        return "비밀번호가 변경 되었습니다.";
    } catch (error) {
        throw new Error("비밀번호 변경 실패");
    }
};

// 회원 탈퇴
const deleteUser = async (deleteData: DeleteUserRequest): Promise<ApiResponse<void>> => {
    try {
        const response = await api.delete<ApiResponse<void>>('/users/delete-my-info', { data: deleteData});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { changePassword, handlePasswordChangeAPI, deleteUser };