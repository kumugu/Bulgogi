import { refreshAccessToken } from "@/api/user/authApi";
import { tokenUtils } from "@/utils/tokenUtils";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/features/auth/useAuth";

// 토큰 갱신 공통 함수
const refreshToken = async (setAuth: any, handleLogout: any) => {
    try {
        console.log("토큰 갱신 요청...");
        const accessToken = await refreshAccessToken();
        if (accessToken) {
            const newDecoded = tokenUtils.setToken(accessToken);
            if (newDecoded) {
                setAuth({ accessToken, username: newDecoded.username });
                console.log("토큰 갱신 성공:", accessToken);
            }
        }
    } catch (error) {
        console.error("토큰 갱신 실패");
        handleLogout();
    }
};

export { refreshToken };
