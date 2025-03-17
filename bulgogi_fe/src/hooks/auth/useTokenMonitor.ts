import { useState, useEffect, useCallback, useRef } from "react";
import api, { refreshAccessToken } from "@/api/axios";
import { tokenUtils } from "@/utils/tokenUtils";
import { useAuthStore } from "@/store/authStore";
import { log } from "console";

export const useTokenMonitor = () => {
    const { setAuth, logout } = useAuthStore();
    const [tokenRemainingTime, setTokenRemainingTime] = useState<number |null>(null);
    const refreshingRef = useRef(false); 

    // 토큰 남은 시간 업데이트 함수
    const updateTokenRemainingTime = useCallback(() => {
        const tokenInfo = tokenUtils.getTokenIfo();
        setTokenRemainingTime(tokenInfo ? tokenInfo.timeLeft : null);
    }, []);
 
    // AccessToken 자동 갱신
    useEffect(() => {
        // 이미 갱신 중이면 중복 요청 방지
        if (refreshingRef.current) return;

        // 토큰 시간이 5분(300초) 이하로 남았을 때만 갱신
        if (tokenRemainingTime !== null && tokenRemainingTime <= 300) {
            console.log("토큰 만료 임박, 자동 갱신 시도...");
            refreshingRef.current = true;   // 갱신 중임을 표시

            refreshAccessToken().then((accessToken) => {
                if (accessToken) {
                    const newDecoded = tokenUtils.setToken(accessToken);
                    if (newDecoded) {
                        setAuth({ accessToken, username: newDecoded.username });
                        console.log("토큰 갱신 성공:", accessToken);
                        updateTokenRemainingTime();
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
    }, [tokenRemainingTime, setAuth, logout, updateTokenRemainingTime]);

    // 1초마다 토큰 남은 시간 체크
    useEffect(() => {
        // 첫 로딩 시 토큰 시간 확인
        updateTokenRemainingTime();

        const interval = setInterval(() => {
            // 갱신 중이 아닐 때만 시간 업데이트
            if (!refreshingRef.current) {
                updateTokenRemainingTime();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [updateTokenRemainingTime]);

    // 만료된 경우 로그아웃
    useEffect(() => {
        const handleTokenExpired = () => {
            console.error("토큰 만료됨, 자동 로그아웃");
            tokenUtils.removeToken();
            logout();
        };

        window.addEventListener("auth:tokenExpired", handleTokenExpired);
        return () => {
            window.removeEventListener("auth:tokenExpired", handleTokenExpired);
        };
    }, [logout]);

    return { tokenRemainingTime };
};