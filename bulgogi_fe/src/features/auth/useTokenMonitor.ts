import { useEffect } from "react";
import { tokenUtils } from "@/utils/tokenUtils";
import { useAuthStore } from "@/store/authStore";

export const useTokenMonitor = () => {
    const { logout } = useAuthStore();

    // 만료된 경우 로그아웃
    useEffect(() => {
        const handleTokenExpired = () => {
            console.error("토큰 만료됨, 자동 로그아웃");
            tokenUtils.removeToken();
            logout();
        };
        
        window.addEventListener("auth:tokenExpired", handleTokenExpired);
        return () => {
            window.removeEventListener("auth:tokenExpired", handleTokenExpired);
        };
    }, [logout]);
    
    return null;
};