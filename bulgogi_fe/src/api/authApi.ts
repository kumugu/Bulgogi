import { api } from "./axios";
import { LoginResponse } from "../types/apiTypes";
import { tokenUtils } from "@/utils/tokenUtils";
import { processQueue, setIsRefreshing } from "./queue";
import { setRefreshTokenFunction } from "./axios";

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await api.post<LoginResponse>("/users/refresh-token", {});
    const { accessToken } = response.data;

    if (!accessToken) {
      throw new Error("토큰 갱신 실패");
    }

    tokenUtils.setToken(accessToken);
    processQueue(null, accessToken);

    return accessToken;
  } catch (error) {
    processQueue(error, null);
    tokenUtils.removeToken();
    window.dispatchEvent(new CustomEvent("auth:tokenExpired")); 
    return null;
  } finally {
    setIsRefreshing(false);
  }
};

// 초기화 함수 실행
setRefreshTokenFunction(refreshAccessToken);