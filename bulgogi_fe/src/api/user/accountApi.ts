import { ChangePasswordRequest, DeleteAccountRequest, RegisterRequest } from "@/types/user/accountTypes";
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

// 계정 삭제
const deleteAccount = async (deleteData: DeleteAccountRequest): Promise<AccountApiResponse<void>> => {
    try {
        const response = await api.delete<AccountApiResponse<void>>('/users/delete-my-account', { data: deleteData});
        return response.data;
    } catch (error) {
        return handleApiError(error); 
    }
};

export { register, changePassword, deleteAccount };