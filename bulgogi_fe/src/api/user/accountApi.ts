import { ChangePasswordRequest, DeleteAccountRequest, RegisterRequest } from "@/types/user/accountTypes";
import { AccountApiResponse } from "@/types/user/accountTypes";
import { api } from "../axios";
import axios, { AxiosError } from "axios";
import { CustomError } from "@/utils/CustomError";

// 공통 API 에러 핸들링 함수
const handleApiError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<AccountApiResponse<null>>;

        // 상세한 에러 로깅
        console.error("API Error:", {
            status: axiosError.response?.status,
            data: axiosError.response?.data,
            message: axiosError.message,
        });

        throw new CustomError(axiosError.response?.data?.message ?? "서버 오류가 발생했습니다.");
    }

    // AxiosError가 아닌 경우
    console.error("Unexpected error:", error);
    throw new CustomError("예상치 못한 오류가 발생했습니다.");
};

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