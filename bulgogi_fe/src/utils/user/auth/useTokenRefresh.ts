import { refreshAccessToken } from "@/api/user/authApi";
import { tokenUtils } from "./tokenUtils";

// 토큰 갱신 공통 함수
const refreshToken = async (setAuth: any, handleLogout: any) => {
    try {
        console.log("토큰 갱신 요청...");
        const response = await refreshAccessToken();
        const { accessToken } = response;

        if (accessToken) {
            const newDecoded = tokenUtils.setToken(accessToken);
            if (newDecoded) {
                setAuth({ accessToken, username: newDecoded.username });
                console.log("토큰 갱신 성공:", accessToken);
            }
        }
    } catch (error) {
        console.error("토큰 갱신 실패");
        handleLogout();
    }
};

export { refreshToken };
