import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/jwtPaylod";

export const tokenUtils = {
    getToken: () => sessionStorage.getItem("accessToken"),
    setToken: (token: string) => {
      sessionStorage.setItem("accessToken", token);
      return tokenUtils.decodeToken(token);
    },
  
    removeToken: () => sessionStorage.removeItem("accessToken"),
    decodeToken: (token: string): JwtPayload | null => {
      try {
        return jwtDecode<JwtPayload>(token);
      } catch (e) {
        console.error("토큰 디코딩 오류:", e);
        return null;
      }
    },
  
    isTokenExpired: (token: string): boolean => {
      const decoded = tokenUtils.decodeToken(token);
      if (!decoded) return true;
  
      const expirationBuffer = 5 * 60;  // 5분
      return decoded.exp - expirationBuffer < Date.now() / 1000;
    },
  
    getTokenIfo: () => {
      const token = tokenUtils.getToken();
      if (!token) return null;
  
      const decoded = tokenUtils.decodeToken(token);
      if (!decoded) return null;
  
      return {
        username: decoded.username,
        expiration: new Date(decoded.exp * 1000),
        timeLeft: Math.floor((decoded.exp * 1000 - Date.now()) / 1000)
      };
    }
  };
  