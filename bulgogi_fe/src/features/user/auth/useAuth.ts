import { useAuthStore } from "@/store/user/authStore";

export const useAuth = () => {
    const { auth, setAuth } = useAuthStore();

    const login = (user: { accessToken: string; username: string; profileImage?: string }) => {
        console.log("Before login:", auth);
        setAuth({
            accessToken: user.accessToken || null,
            username: user.username || null,
            profileImage: user.profileImage || null, // Ensure profileImage is set
        });
        console.log("After login:", auth);
    };

    const isAuthenticated = !!auth.accessToken;

    return { isAuthenticated, auth, login };
};
