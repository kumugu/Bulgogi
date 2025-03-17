import { create } from "zustand";

interface AuthState {
  auth: {
    accessToken: string | null;
    username: string | null;
  };
  isAuthenticated: boolean;
  setAuth: (token: { accessToken: string; username: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  auth: {
    accessToken: null,
    username: null,
  },
  isAuthenticated: false,
  setAuth: (auth) =>
    set({ auth, isAuthenticated: !!auth.accessToken }),
  logout: () => 
    set({ auth: { accessToken: null, username: null } }),
}));
