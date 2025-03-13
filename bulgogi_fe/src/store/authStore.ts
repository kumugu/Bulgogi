import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  username: string | null;
  setAuth: (token: { accessToken: string; refreshToken: string; username: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  username: null,

  setAuth: ({ accessToken, refreshToken, username }) =>
    set({ accessToken, refreshToken, username }),

  logout: () => {
    // sessionStorage에서 토큰 삭제
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

    // Zustand 상태 초기화
    set({ accessToken: null, refreshToken: null, username: null });
  },
}));
