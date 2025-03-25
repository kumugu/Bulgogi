import { ChangePasswordRequest, DeleteAccountRequest, RegisterRequest } from "@/types/user/accountTypes";
import { AccountApiResponse } from "@/types/user/accountTypes";
import { api } from "../axios";
import axios, { Axios, AxiosError } from "axios";
import { CustomError } from "@/utils/CustomError";


// 회원가입
const register = async (registerData: RegisterRequest): Promise<AccountApiResponse<void>> => {
    try {
        const response = await api.post<AccountApiResponse<void>>('/users/register', registerData);
        return response.data;
    } catch (error) {
        // AxiosError 타입 확인
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            // 상세한 에러 로깅
            console.error('Registration Error:', {
                status: axiosError.response?.status,
                data: axiosError.response?.data,
                message: axiosError.message
            });
            throw error;
        }
        // AxiosError가 아닌 경우
        console.error('Unexpected error:', error);
        throw new CustomError('예상치 못한 오류가 발생했습니다.');
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