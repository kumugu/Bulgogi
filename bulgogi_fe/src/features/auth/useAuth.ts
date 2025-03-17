import { useAuthStore } from "@/store/authStore";
import { tokenUtils } from '@/utils/tokenUtils';
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { LoginResponse } from "@/types/api";
import api, { refreshAccessToken } from "@/api/axios";

export const useAuth = () => {
    const { setAuth, logout, auth } = useAuthStore();
    const navigate = useNavigate();
    // const isAuthenticated = !!auth?.accessToken;

    // 로그인 함수
    const login = async (email: string, password: string) => {
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
                navigate(`/my-blog-home/${decoded.username}`);
            }
        } catch (error: any) {
            console.error("로그인 실패", error.response?.data || error.message);
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

            await api.post("/users/logout", {});

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
   

    return { 
        login, 
        handleLogout,
        refreshTokenManually,
        tokenInfo: tokenUtils.getTokenIfo(),
        isAuthenticated: !!auth?.accessToken
    };
};