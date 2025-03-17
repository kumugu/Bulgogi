import { useState, useEffect, useCallback, useRef } from "react";
import { refreshAccessToken } from "@/api/authApi";
import { tokenUtils } from "@/utils/tokenUtils";
import { useAuthStore } from "@/store/authStore";
import { log } from "console";

export const useAutomaticTokenRefresh = (tokenRemainingTime: number | null) => {
    const { setAuth, logout } = useAuthStore();
    const refreshingRef = useRef(false);

    // AccessToken 자동 갱신
    useEffect(() => {
        // 이미 갱신 중이면 중복 요청 방지
        if (refreshingRef.current) return;

        // 토큰 시간이 1분(60초) 이하로 남았을 때 자동으로 갱신
        if (tokenRemainingTime !== null && tokenRemainingTime <= 60) {
            console.log("토큰 만료 임박, 자동 갱신 시도...");
            refreshingRef.current = true;   // 갱신 중임을 표시

            refreshAccessToken().then((accessToken) => {
                if (accessToken) {
                    const newDecoded = tokenUtils.setToken(accessToken);
                    if (newDecoded) {
                        setAuth({ accessToken, username: newDecoded.username });
                        console.log("토큰 갱신 성공:", accessToken);
                    }
                }
                refreshingRef.current = false;  // 갱신 완료
            }).catch(() => {
                console.error("토큰 갱신 실패, 로그아웃 처리");
                tokenUtils.removeToken();
                logout();
                refreshingRef.current = false;  // 갱신 실패해도 플래그 리셋
            });
        }
    }, [tokenRemainingTime, setAuth, logout]);

    return null;
};
