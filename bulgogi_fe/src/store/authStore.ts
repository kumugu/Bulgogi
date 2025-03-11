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
  logout: () => set({ accessToken: null, refreshToken: null, username: null }),
}));
