import { changePasswordService } from "@/service/user/accountService";
import { ChangePasswordRequest } from "@/types/user/accountTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom"


export const useChangePassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const changePassword = async (data: ChangePasswordRequest) => {
        const { oldPassword, newPassword } = data;

        // 비밀번호 유효성 검사
        if (newPassword.length < 8 || newPassword.length > 20) {
            setError("비밀번호는 8자 이상 20자 이하로 입력해주세요.");
            return;
        }
        if (!/[A-Z]/.test(newPassword)) {
            setError("비밀번호에는 최소한 하나의 대문자가 포함되어야 합니다.");
            return;
        }
        if (!/[a-z]/.test(newPassword)) {
            setError("비밀번호에는 최소한 하나의 소문자가 포함되어야 합니다.");
            return;
        }
        if (!/[0-9]/.test(newPassword)) {
            setError("비밀번호에는 최소한 하나의 숫자가 포함되어야 합니다.");
            return;
        }
        if (!/[!@#$%^&*]/.test(newPassword)) {
            setError("비밀번호에는 최소한 하나의 특수문자(!@#$%^&*)가 포함되어야 합니다.");
            return;
        }
        
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const successMessage = await changePasswordService(data);
            setMessage(successMessage);
            setTimeout(() => navigate("/user-settings"), 1000);
        } catch (error: any) {
            setError(error.message || "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return{ changePassword, loading, error, message };
};