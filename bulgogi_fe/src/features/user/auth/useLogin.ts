import React, { useState } from "react";
import { useAuthStore } from "@/store/user/authStore";
import { useNavigate } from "react-router-dom";
import { loginService } from "@/service/user/authService";

export const useLogin = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    // 로그인 유효성 검사
    const login = async (email: string, password: string) => {
        try {
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

            const user = await loginService(email, password);
            
            // 로그인 성공 시
            if (user) {
                // 로그인 성공 시 authStore 업데이트
                setAuth({ accessToken: user.accessToken, username: user.username });
                
                // 로그인 후 홈으로 리디렉션
                navigate("/");
                return true;
            }

            // 로그인 실패 시
            setErrorMessage("로그인에 실패했습니다.");
            return false;
        } catch (error) {
            setErrorMessage("로그인 처리 중 오류가 발생했습니다.");
            return false;
        }
    };

    return { login, errorMessage, setErrorMessage };
};
