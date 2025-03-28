import { login, refreshAccessToken, logout } from "@/api/user/authApi";
import { useAuthStore } from "@/store/user/authStore";
import { getErrorMessage } from "@/utils/user/login/loginErrorMessage ";
import { tokenUtils } from "@/utils/user/auth/tokenUtils";
import { AxiosError } from "axios";
import { getProfileImage } from "@/api/user/authApi";

// 로그인 서비스
const loginService = async (email: string, password: string) => {
    try {
        const response = await login(email, password);

        if (!response?.accessToken) {
            console.error("accessToken이 반환되지 않음");
        }

        // 토큰 설정 및 처리
        const { accessToken } = response;
        const decoded = tokenUtils.setToken(accessToken);

        if (!decoded) throw new Error("토큰 디코딩 실패");

        return { accessToken, username: decoded.username };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw new Error(getErrorMessage(error));
        }
        throw new Error("알 수 없는 오류가 발생했습니다.");
    }
};

// 프로필 이미지 가져오기 서비스
const getProfileImageService = async () => {
    try {
        const profileImage = await getProfileImage();
        const { accessToken, username } = useAuthStore.getState().auth;

        // null 체크 후 기본값 설정
        useAuthStore.getState().setAuth({
            accessToken: accessToken || "",  // accessToken이 null이면 빈 문자열로 대체
            username: username || "Unknown User",  // username이 null이면 기본값 설정
            profileImage: profileImage || ""  // profileImage가 null이면 빈 문자열로 대체
        });

        return profileImage;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error("프로필 이미지 가져오기 실패", error.response?.data || error.message);
        } else {
            console.error("알 수 없는 오류 발생", error);
        }
        return null;
    }
};


// 토큰 갱신 서비스
const refreshTokenService = async () => {
    try {
        const response = await refreshAccessToken();

        if (!response?.accessToken) {
            console.error("accessToken 갱신 실패");
            // 로그아웃 처리
            await logoutService();
            return null;
        }
        
        // 새로운 토큰 처리
        tokenUtils.setToken(response.accessToken);
        return response.accessToken;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("토큰 갱신 중 오류 발생", error.response?.data || error.message);
        } else {
            console.error("알 수 없는 오류 발생", error);
        }
        // 로그아웃 처리
        await logoutService();
        return null;
    }
};


// 로그아웃 서비스
const logoutService = async () => {
    try {
        await logout();

        // 토큰 및 세션 처리
        tokenUtils.removeToken();
        sessionStorage.removeItem("accessToken");
        useAuthStore.getState().resetAuthState();
        
        return true;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("로그아웃 중 오류 발생", error.response?.data || error.message);
        } else {
            console.error("알 수 없는 오류 발생", error);
        }
        return false;
    }
};

export { loginService, getProfileImageService, refreshTokenService, logoutService };
