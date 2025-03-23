import { useAuthStore } from "@/store/user/authStore"
import { tokenUtils } from "@/utils/tokenUtils";
import { useNavigate } from "react-router-dom";

// 로그아웃 
export const useLogout = () => {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    // 로그아웃 함수
    const logoutUser = () => {
        // 세션 스토리지에서 토큰 삭제
        tokenUtils.removeToken();

        // 상태 초기화
        logout();

        // 로그인 화면으로 리디렉션
        navigate("/login");
    };

    return { logoutUser };
}
