import { useAuthStore } from "@/store/user/authStore";
import { useUserStore } from "@/store/user/userStore";
import { api } from "../axios";
import { LoginResponse } from "@/types/user/authTypes";


// 로그인
const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>("/users/login", { email, password });
  
  // 인증 정보는 useAuthStore에 저장
  useAuthStore.getState().setAuth({
    accessToken: response.data.accessToken,
    username: response.data.username,
    profileImage: response.data.profileImageUrl, // 여기서 프로필 이미지 URL 저장
  });
  
  // 프로필 정보는 useUserStore에 저장
  useUserStore.getState().setUserProfile({
    username: response.data.username,
    profileImageUrl: response.data.profileImageUrl, // 사용자 프로필 URL 저장
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
