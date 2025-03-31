import { useState } from "react";
import { AdminUpdateUserRequest, AdminUpdateUserResponse } from "@/types/user/adminTypes";
import adminUpdateUserService from "@/service/user/adminService";


export const useAdminUpdateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [adminUpdatedUser, setAdminUpdatedUser] = useState<AdminUpdateUserResponse | null>(null);

    const adminUpdateUser = async (targetId: number, updateData:AdminUpdateUserRequest) => {
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const updatedUser = await adminUpdateUserService(targetId, updateData);
            setAdminUpdatedUser(updatedUser);
            setMessage("사용자 정보가 성공적으로 업데이트되었습니다.");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("알 수 없는 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    return { adminUpdateUser, adminUpdatedUser, loading, error, message };
};