import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { tokenUtils } from '@/utils/tokenUtils';
import { useNavigate } from "react-router-dom";
import { LoginResponse } from "@/types/apiTypes";
import { api } from "@/api/axios";
import { AxiosError } from "axios";

export const useAuth = () => {
    const { setAuth, auth } = useAuthStore();
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    

    // 로그인 함수
    const login = async (email: string, password: string) => {
        // 이메일과 비밀번호 입력 여부 확인
        if (!email.trim()) {
            setErrorMessage("이메일을 입력하세요.");
            return;
        }
        if (!password.trim()) {
            setErrorMessage("비밀번호를 입력하세요");
            return;
        }

        // 이메일 형식 확인 (정규식 사용)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("유효한 이메일을 입력하세요.");
            return;
        }

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
                navigate("/");
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                // 서버 오류 메시지
                let message = '로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.';
     
                switch (error.response?.status) {
                    case 400:
                        message = error.response?.data?.message || "잘못된 요청입니다. 이메일과 비밀번호를 확인해주세요.";
                        break;
                    case 401:
                        message = "비밀번호가 올바르지 않습니다.";
                        break;
                    case 403:
                        if (error.response?.data?.message === "탈퇴한 계정입니다.") {
                            message = "탈퇴한 계정입니다. 고객센터에 문의해주세요.";
                        } else if (error.response?.data?.message === "이메일을 찾을 수 없습니다.") {
                            message = "등록된 이메일이 없습니다. 이메일을 확인해주세요.";
                        } else if (error.response?.data?.message === "비밀번호가 일치하지 않습니다.") {
                            message = "비밀번호가 일치하지 않습니다. 비밀번호를 확인해주세요.";
                        } else {
                            message = "접근 권한이 없습니다.";
                        }
                        break;
                    case 404:
                        message = "사용자를 찾을 수 없습니다.";
                        break;
                    case 500:
                        message = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
                        break;
                }
                setErrorMessage(message);
            }
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

            // 서버에서 로그아웃 API 호출
            await api.post("/users/logout", {});

            // 상태 및 세션 초기화
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



    return { 
        login, 
        handleLogout,
        tokenInfo: tokenUtils.getTokenIfo(),
        isAuthenticated: !!auth?.accessToken,
        errorMessage,
        setErrorMessage
    };
};