import { deleteAccountService } from "@/service/user/accountService";
import { DeleteAccountRequest } from "@/types/user/accountTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export const useDeleteAccount = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const deleteAccount = async (data: DeleteAccountRequest) => {
        
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const successMessage = await deleteAccountService(data);
            setMessage(successMessage);
            setTimeout(() => navigate("/home"), 1000);  // 로그아웃도 해야함함
        } catch (error: any) {
            setError(error.message || "회원탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return{ deleteAccount, loading, error, message };
}