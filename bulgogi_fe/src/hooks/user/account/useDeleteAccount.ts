import { deleteAccountService } from "@/service/user/accountService";
import { DeleteAccountRequest } from "@/types/user/accountTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/user/auth/useLogout";  

export const useDeleteAccount = () => {
    const navigate = useNavigate();
    const { logoutUser } = useLogout();  
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

            // 회원 탈퇴 후 로그아웃 실행
            logoutUser();

            // 홈 화면으로 이동 (1초 딜레이)
            setTimeout(() => navigate("/login"), 1000);
        } catch (error: any) {
            setError(error.message || "회원탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return { deleteAccount, loading, error, message };
};
