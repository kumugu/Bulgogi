import { useAuthStore } from "@/store/authStore";
import { tokenUtils } from '@/utils/tokenUtils';
import { useNavigate } from "react-router-dom";
import { LoginResponse } from "@/types/apiTypes";
import { api } from "@/api/axios";
import { AxiosError } from "axios";


export const useAuth = () => {
    const { setAuth, auth } = useAuthStore();
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    

    // 로그인 함수
    const login = async (email: string, password: string) => {
        // 이메일과 비밀번호 입력 여부 확인
        if (!email.trim()) {
            alert("이메일을 입력하세요.");
            return;
        }
        if (!password.trim()) {
            alert("비밀번호를 입력하세요");
            return;
        }

        // 이메일 형식 확인 (정규식 사용)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("유효한 이메일을 입력하세요.");
            return;
        }

        try {
            const response = await api.post<LoginResponse>("/users/login", { email, password });

            if (!response?.data?.accessToken) {
                console.error("accessToken이 반환되지 않음");
                return;
            }

            const { accessToken } = response.data;
            const decoded = tokenUtils.setToken(accessToken);

            if (decoded) {
                setAuth({ accessToken, username: decoded.username });
                navigate("/");
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
               // 서버 오류 메시지 변경
               const errorMessage = '로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.';
               alert(errorMessage);
            } else {
                alert("로그인 중 오류가 발생했습니다.");
            }
        }
    };


      // 로그아웃
      const handleLogout = async () => {
        try {
            const token = sessionStorage.getItem("accessToken");
            if (!token) {
                console.error("로그인하지 않은 상태입니다.");
                return;
            }

            // 서버에서 로그아웃 API 호출
            await api.post("/users/logout", {});

            // 상태 및 세션 초기화
            logout();
            sessionStorage.removeItem("accessToken");
            console.log("로그아웃 성공");
            
            navigate("/");
        } catch (error: any) {
            logout();
            sessionStorage.removeItem("accessToken");
            console.error("로그아웃 중 오류 발생. 클라이언트에서 토큰 삭제됨.", error.response?.data || error.message);

            navigate("/")
        }
    };



    return { 
        login, 
        handleLogout,
        tokenInfo: tokenUtils.getTokenIfo(),
        isAuthenticated: !!auth?.accessToken
    };
};