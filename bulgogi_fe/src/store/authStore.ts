import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  username: string | null;
  setAuth: (token: { accessToken: string; username: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  username: null,
  setAuth: ({ accessToken, username }) =>
    set({ accessToken, username }),
  logout: () => set({ accessToken: null, username: null }),
}));
