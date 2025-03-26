import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/types/toKenTypes";

// 토큰 관련 유틸리티 함수 모음
export const tokenUtils = {
    // 세션 스토리지에서 액세스 토큰 가져오기
    getToken: () => sessionStorage.getItem("accessToken"),
    
    // 세션 스토리지에 액세스 토큰 저장 및 디코딩
    setToken: (token: string) => {
      sessionStorage.setItem("accessToken", token);
      const decoded = tokenUtils.decodeToken(token);

      if (!decoded) {
        console.error("토큰 디코딩 실패: 유효하지 않은 토큰입니다.");
        throw new Error("유효하지 않은 토큰입니다.");
      }

      return decoded;
    },
  
    // 세션 스토리지에서 액세스 토큰 삭제
    removeToken: () => sessionStorage.removeItem("accessToken"),
    
    // JWT 토큰 디코딩
    decodeToken: (token: string): JwtPayload | null => {
      try {
        return jwtDecode<JwtPayload>(token);
      } catch (e) {
        console.error("토큰 디코딩 오류:", e);
        return null; 
      }
    },
  
    // 토큰 만료 여부 확인
    isTokenExpired: (token: string): boolean => {
      const decoded = tokenUtils.decodeToken(token);
      if (!decoded) return true; 
  
      const expirationBuffer = 2 * 60;  // 만료까지의 2분 버퍼
      return decoded.exp - expirationBuffer < Date.now() / 1000; // 토큰 만료 확인
    },
  
    // 토큰의 추가 정보 가져오기
    getTokenIfo: () => {
      const token = tokenUtils.getToken();
      if (!token) return null; // 토큰이 없을 경우 null 반환
  
      const decoded = tokenUtils.decodeToken(token);
      if (!decoded) return null; // 디코딩 실패 시 null 반환
  
      return {
        username: decoded.username, // 토큰에 저장된 사용자 이름
        expiration: new Date(decoded.exp * 1000), // 토큰 만료 시간
        timeLeft: Math.floor((decoded.exp * 1000 - Date.now()) / 1000) // 남은 시간 (초 단위)
      };
    }
};
