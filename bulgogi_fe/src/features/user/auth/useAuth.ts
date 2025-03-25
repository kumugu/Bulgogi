import { useAuthStore } from "@/store/user/authStore"

export const useAuth = () => {
    const { auth, logout } = useAuthStore();

    // 인증 상태 반환
    const isAuthenticated = !!auth.accessToken;

    return { isAuthenticated, logout, auth };
};
