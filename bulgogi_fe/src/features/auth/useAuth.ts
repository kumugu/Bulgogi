import api from "../../api/axios"; 
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../../store/authStore"; 

interface JwtPayload {
    sub: string;
    iat: number;
    exp: number;
    username: string;
}

export const useAuth = () => {
    const { setAuth } = useAuthStore(); 
    const login = async (email: string, password: string) => { 
        try {
            // API 요청을 통해 이메일과 비밀번호를 사용하여 로그인
            const response = await api.post("/users/login", { email, password }); 
            console.log("로그인 응답 데이터:", response.data) 

            const { accessToken, refreshToken } = response.data;
            if (!accessToken) {
                console.error("accessToken이 반환되지 않음");
                return;
            }

            // JWT Token을 디코딩하여 username 추출
            const decoded: JwtPayload = jwtDecode(accessToken);
            const username = decoded.username;  // 명시적으로 username 추출(다른방식도 고려해봐야할듯)
            console.log("디코딩된 username:", username);

            // Zustand에 저장
            setAuth({ accessToken, refreshToken, username });
            console.log("저장된 Zustand 값:", useAuthStore.getState());
            
            // 토큰을 로컬 스토리지에 저장 (refreshToken 저장 방식 고려, 현재 Redis에도 저장됨)
            localStorage.setItem("accessToken", accessToken); 
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("username", username);

            console.log("저장된 Zustand 값:", useAuthStore.getState());
            console.log("로컬 스토리지 값:", {
                accessToken: localStorage.getItem("accessToken"),
                refreshToken: localStorage.getItem("refreshToken"),
                username: localStorage.getItem("username")
            });
        } catch (error) {
            console.error("로그인 실패", error); 
        }
    };

    return { login };
};
