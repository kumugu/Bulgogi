import { create } from "zustand";

interface AuthState {
  auth: {
    accessToken: string | null;
    username: string | null;
  };
  setAuth: (token: { accessToken: string; username: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  auth: {
    accessToken: null,
    username: null,
  },
  setAuth: (auth) =>
    set({ auth }),
  logout: () => 
    set({ auth: { accessToken: null, username: null } }),
}));
