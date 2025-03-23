import { ChangePasswordRequest, DeleteUserRequest, RegisterRequest } from "@/types/user/accountTypes";
import { AccountApiResponse } from "@/types/user/accountTypes";
import { api } from "../axios";


// 회원가입
const register = async (registerData: RegisterRequest): Promise<AccountApiResponse<void>> => {
    try {
        const response = await api.post<AccountApiResponse<void>>('/users/register', registerData);
        return response.data;
    } catch (error) {
        return handleApiError(error); 
    }
};

// 비밀번호 변경
const changePassword = async (passwordData: ChangePasswordRequest): Promise<AccountApiResponse<void>> => {
    try {
        const response = await api.put<AccountApiResponse<void>>('/users/change-password', passwordData);
        return response.data;
    } catch (error) {
        return handleApiError(error); 
    }
};

// 회원 탈퇴
const deleteUser = async (deleteData: DeleteUserRequest): Promise<AccountApiResponse<void>> => {
    try {
        const response = await api.delete<AccountApiResponse<void>>('/users/delete-my-info', { data: deleteData});
        return response.data;
    } catch (error) {
        return handleApiError(error); 
    }
};

export { register, changePassword, deleteUser };