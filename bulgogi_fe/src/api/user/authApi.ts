import { api } from "../axios";
import { LoginResponse } from "../../types/apiTypes";


// 로그인
const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>("/users/login", { email, password });
  return response.data;
};


// 토큰 갱신
const refreshAccessToken = async (): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/users/refresh-token", {});
  return response.data;
};

// 로그 아웃
const logout = async () => {
  await api.post("/users/logout", {});
}

export { login, refreshAccessToken, logout }

//   try {
//     const response = await api.post<LoginResponse>("/users/refresh-token", {});
//     const { accessToken } = response.data;

//     if (!accessToken) {
//       throw new Error("토큰 갱신 실패");
//     }

//     tokenUtils.setToken(accessToken);
//     processQueue(null, accessToken);

//     return accessToken;
//   } catch (error) {
//     processQueue(error, null);
//     tokenUtils.removeToken();
//     window.dispatchEvent(new CustomEvent("auth:tokenExpired")); 
//     return null;
//   } finally {
//     setIsRefreshing(false);
//   }
// };

// 초기화 함수 실행
// setRefreshTokenFunction(refreshAccessToken);