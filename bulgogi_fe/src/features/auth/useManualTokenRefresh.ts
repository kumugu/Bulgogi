import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { refreshAccessToken } from "@/api/authApi";
import { tokenUtils } from "@/utils/tokenUtils";
import { useAuth } from "@/features/auth/useAuth"

export const useTokenRefresh = () => {
    const { setAuth } = useAuthStore();
    const { handleLogout } = useAuth();

    const refreshTokenManually = async () => {
        try {
            console.log("토큰 수동 갱신 요청...");
            const accessToken = await refreshAccessToken();
            if (accessToken) {
                const newDecoded = tokenUtils.setToken(accessToken);
                if (newDecoded) {
                    setAuth({ accessToken, username: newDecoded.username });
                    console.log("토큰 갱신 성공:", accessToken);
                }
            }
        } catch (error) {
            console.error("수동 토큰 갱신 실패");
            handleLogout();
        }
    };

    return { refreshTokenManually };
};


