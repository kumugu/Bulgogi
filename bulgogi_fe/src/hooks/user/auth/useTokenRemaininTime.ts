import { useState, useEffect, useCallback } from "react";
import { tokenUtils } from "@/utils/user/auth/tokenUtils";

export const useTokenRemainingTime = () => {
    const [tokenRemainingTime, setTokenRemainingTime] = useState<number | null>(null);

    // 토큰 남은 시간 업데이트 함수
    const updateTokenRemainingTime = useCallback(() => {
        const tokenInfo = tokenUtils.getTokenIfo();
        setTokenRemainingTime(tokenInfo ? tokenInfo.timeLeft : null);
    }, []);

    useEffect(() => {
        // 첫 로딩 시 토큰 시간 확인
        updateTokenRemainingTime();

        const interval = setInterval(() => {
            updateTokenRemainingTime();
        }, 1000);

        return () => clearInterval(interval);
    }, [updateTokenRemainingTime]);

    return tokenRemainingTime;
}