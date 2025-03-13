import api from "../../api/axios"; 
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../../store/authStore"; 
import { useEffect } from "react";

interface JwtPayload {
    sub: string;
    iat: number;
    exp: number;
    username: string;
}

export const useAuth = () => {
    const { setAuth, logout } = useAuthStore(); 

    // 로그인
    const login = async (email: string, password: string) => { 
        try {
            // API 요청을 통해 이메일과 비밀번호를 사용하여 로그인
            const response = await api.post("/users/login", { email, password }, { withCredentials: true }); 
            console.log("로그인 응답 데이터:", response.data) 

            if (!response?.data?.accessToken) {
                console.error("accessToken이 반환되지 않음");
                return;
            }

            const { accessToken } = response.data;

            // JWT Token을 디코딩하여 username 추출
            const decoded: JwtPayload = jwtDecode(accessToken);
            const username = decoded.username;  // 명시적으로 username 추출(다른방식도 고려해봐야할듯)
            console.log("디코딩된 username:", username);

            // Zustand에 저장
            setAuth({ accessToken, username });
            console.log("저장된 Zustand 값:", useAuthStore.getState());
            
            // 토큰을 로컬 스토리지에 저장 (refreshToken 저장 방식 고려, 현재 Redis에도 저장됨)
            sessionStorage.setItem("accessToken", accessToken); 

        } catch (error) {
            console.error("로그인 실패", error); 
        }
    };

    // 로그인 연장 (accessToken 갱신, "/users/refresh-token")
    const refreshAccessToken = async () => {

        try {
            const response = await api.post("/users/refresh-token", {}, { withCredentials: true });
            const { accessToken } = response.data;

            if (!accessToken) {
                console.error("새로운 accessToken이 없음");
                logout();
                return;
            }

            const decode: JwtPayload = jwtDecode(accessToken);
            const username = decode.username;

            // 상태 업데이트
            setAuth({ accessToken, refreshToken, username });
            sessionStorage.setItem("asccessToken", accessToken);
        } catch (error) {
            console.error("토큰 갱신 실패, 로그아웃 처리", error);
            logout();
        }
    }


    // 로그아웃
    const handleLogout = async () => {
        try {
            await api.post("/users/logout", {}, { withCredentials: true });

            // 상태 및 sessionStorage 초기화 
            logout();
            sessionStorage.removeItem("accessToken");

        } catch (error) {
            console.error("로그아웃 실패", error);
        }
    };

    return { login, handleLogout };
};
