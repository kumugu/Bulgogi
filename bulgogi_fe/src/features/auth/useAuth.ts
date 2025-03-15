import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "@/api/axios";

interface JwtPayload {
    sub: string;
    iat: number;
    exp: number;
    username: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken?: string;
}

export const useAuth = () => {
    const { setAuth, logout } = useAuthStore();
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            // api 인스턴스를 사용하여 요청 보내기
            const response = await api.post<LoginResponse>("/users/login", { email, password });

            // accessToken이 반환되지 않으면 오류 처리
            if (!response?.data?.accessToken) {
                console.error("accessToken이 반환되지 않음");
                return;
            }

            const { accessToken } = response.data;
            const decoded: JwtPayload = jwtDecode(accessToken);
            const username = decoded.username;

            setAuth({ accessToken, username });
            sessionStorage.setItem("accessToken", accessToken);

            // 로그인 후 MyBlogHome으로 이동
            navigate(`/my-blog-home/${username}`);
        } catch (error: any) {
            console.error("로그인 실패", error.response?.data || error.message);
        }
    };


    // 토큰 갱신
    const refreshAccessToken = async () => {
        try {
            const response = await axios.post<LoginResponse>("/users/refresh-token", {}, { withCredentials: true });
            const { accessToken } = response.data;

            if (!accessToken) {
                console.error("새로운 accessToken이 없음");
                logout();
                return;
            }

            const decode: JwtPayload = jwtDecode(accessToken);
            const username = decode.username;

            setAuth({ accessToken, username });
            sessionStorage.setItem("accessToken", accessToken);
        } catch (error: any) { // `error`를 `any`로 처리
            console.error("토큰 갱신 실패, 로그아웃 처리", error.response?.data || error.message);
            logout();
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

            await axios.post("http://localhost:8080/api/users/logout", {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            logout();
            sessionStorage.removeItem("accessToken");
            console.log("로그아웃 성공");
            
            navigate("/");
        } catch (error: any) { // `error`를 `any`로 처리
            logout();
            sessionStorage.removeItem("accessToken");
            console.error("로그아웃 중 오류 발생. 클라이언트에서 토큰 삭제됨.", error.response?.data || error.message);

            navigate("/")
        }
    };

    // 컴포넌트 마운트 시 토큰 확인
    useEffect(() => {
        const storedToken = sessionStorage.getItem("accessToken");
        if (storedToken) {
            const decode: JwtPayload = jwtDecode(storedToken);
            setAuth({ accessToken: storedToken, username: decode.username });
        }
    }, [setAuth]);

    return { login, refreshAccessToken, handleLogout };
};
