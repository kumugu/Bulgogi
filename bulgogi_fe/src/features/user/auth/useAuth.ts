import { useAuthStore } from "@/store/user/authStore";

export const useAuth = () => {
    const { auth, setAuth } = useAuthStore();

    const login = (user: { accessToken: string; username: string }) => {
        console.log("Before login:", auth);
        setAuth(user); 
        console.log("After login:", auth);
    };

    // 인증 상태 반환
    const isAuthenticated = !!auth.accessToken;

    return { isAuthenticated, auth, login };
};
