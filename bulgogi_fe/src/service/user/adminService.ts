import { adminUpdateUserInfo } from "@/api/user/adminApi";
import { AdminUpdateUserRequest, AdminUpdateUserResponse, ApiAdimResponse } from "@/types/user/adminTypes";
import { AxiosError } from "axios";

const adminUpdateUserService = async (targetId: number, updateData: AdminUpdateUserRequest): Promise<AdminUpdateUserResponse> => {
    try {
        const response = await adminUpdateUserInfo(targetId, updateData);
        if (!response.success) {
            throw new Error(response.message || "사용자 정보 수정에 실패했습니다.");
        }
        return response.data as AdminUpdateUserResponse;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("사용자 정보 수정 중 오류 발생:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "사용자 정보를 수정할 수 없습니다.");
        } else {
            console.error("알 수 없는 오류 발생:", error);
            throw new Error("사용자 정보를 수정할 수 없습니다.");
        }
    }
};

export default { adminUpdateUserService };