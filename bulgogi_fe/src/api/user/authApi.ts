import { useAuthStore } from "@/store/user/authStore";
import { api } from "../axios";
import { LoginResponse } from "@/types/user/authTypes";


// 로그인
const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>("/users/login", { email, password });
  useAuthStore.getState().setAuth({
    accessToken: response.data.accessToken,
    username: response.data.username,
    profileImage: response.data.profileImageUrl,
  });
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
