import { useAuthStore } from "@/store/user/authStore";
import { useModalStore } from "@/store/user/modalStore";
import { useNavigate } from "react-router-dom";
import { loginService } from "@/service/user/authService";
import axios from "axios";
import { getErrorMessage } from "@/utils/user/login/loginErrorMessage ";

export const useLogin = () => {
    const { openModal } = useModalStore();
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        if (!email.trim()) {
            openModal("error", "이메일을 입력하세요.");
            return false;
        }
        if (!password.trim()) {
            openModal("error", "비밀번호를 입력하세요.");
            return false;
        }
        
        try {
            const user = await loginService(email, password);

            // 로그인 성공 시 프로필 이미지 포함
            setAuth({
                accessToken: user.accessToken,
                username: user.username,
                profileImage: user.profileImageUrl, // Ensure profileImage is included
            });
            navigate("/");
            return true;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = getErrorMessage(error);

                if (error.response && error.response.data && error.response.data.message) {
                    openModal("error", errorMessage);
                }
            } else {
                openModal("error", "예상치 못한 오류가 발생했습니다.");
            }
            return false;
        }
    };
    
    return { login };
};