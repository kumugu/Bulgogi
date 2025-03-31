import { useState, useEffect, useCallback, useRef } from "react";
import { refreshAccessToken } from "@/api/user/authApi";
import { tokenUtils } from "@/utils/user/auth/tokenUtils";
import { useAuthStore } from "@/store/user/authStore";
import { access } from "fs";
import { useTokenRemainingTime } from "./useTokenRemaininTime";

interface RefreshTokenParams {
    setAuth: (authData: { accessToken: string; username: string }) => void;
    logout: () => void;
}

// 토큰 갱신 함수
const refreshToken = async ({
    setAuth, logout
}: RefreshTokenParams) => {
    try {
        console.log("토큰 갱신 시도...");
        const response = await refreshAccessToken();

        if (!response?.accessToken) {
            throw new Error("토큰 갱신 실패: 유효한 응답이 없음");
        }

        const newDecoded = tokenUtils.setToken(response.accessToken);
        if (newDecoded) {
            setAuth({
                accessToken: response.accessToken,
                username: newDecoded.username
            });
            console.log("토큰 갱신 성공");
            return true;
        }

        throw new Error("토큰 디코딩 실패");
    } catch (error) {
        console.error("토큰 갱신 실패:", error);
        tokenUtils.removeToken();
        logout();
        return false;
    }
};


// 자동 토큰 갱신
export const useAutomaticTokenRefresh = (tokenRemainingTime: number | null) => {
    const { setAuth, logout } = useAuthStore();
    const refreshingRef = useRef(false);
  
    // 자동 갱신 로직
    useEffect(() => {
      // 토큰 시간이 1분(60초) 이하로 남았을 때 자동으로 갱신
      if (tokenRemainingTime !== null && tokenRemainingTime <= 60 && !refreshingRef.current) {
        console.log("토큰 만료 임박, 자동 갱신 시도...");
        refreshingRef.current = true;
        refreshToken({ setAuth, logout }).then((success) => {
            refreshingRef.current = false;
            if (!success) {
                console.error("자동 갱신 실패");
            }
        });
      }
    }, [tokenRemainingTime, setAuth, logout]);
  
    return null;
  };


// 수동 토큰 갱신
export const useManualTokenRefresh = () => {
    const { setAuth, logout } = useAuthStore();
    const refreshingRef = useRef(false);

    const refreshTokenManually = useCallback(async () => {
        if (refreshingRef.current) return;  // 중복 요청 방지
        console.log("토큰 수동 갱신 요청...");
        refreshingRef.current = true;   // 갱신 중 표시
        const success = await refreshToken({ setAuth, logout });
        refreshingRef.current = false;  // 갱신 완료
        if (!success) {
            console.error("수동 갱신 실패");
        }
    }, [setAuth, logout]);

    return { refreshTokenManually };
};