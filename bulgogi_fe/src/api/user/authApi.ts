import { api } from "../axios";
import { LoginResponse } from "@/types/user/authTypes";


// 로그인
const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>("/users/login", { email, password });
  return response.data;
};

// 프로필 이미지 URL 가져오기
const getProfileImage = async (): Promise<string> => {
  const response = await api.get("/users/profile-image");  
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

export { login, getProfileImage, refreshAccessToken, logout }
