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
        // 유효성 검증
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

            // 로그인 성공 시
            setAuth({ accessToken: user.accessToken, username: user.username });
            navigate("/");
            return true;

        } catch (error) {
            // Axios Error 상세 표시
            if (axios.isAxiosError(error)) {
                const errorMessage = getErrorMessage(error);

                if (error.response && error.response.data && error.response.data.message) {
                    openModal("error", errorMessage);
                }
            } else {
                openModal("error", "예상치 못한 오류가 발생했습니다.훅");
            }
            return false;
        }
    };
    
    return { login };
};
