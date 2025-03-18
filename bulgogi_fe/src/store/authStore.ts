import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  auth: {
    accessToken: string | null;
    username: string | null;
  };
  isAuthenticated: boolean;
  setAuth: (token: { accessToken: string; username: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      auth: {
        accessToken: null,
        username: null,
      },
      isAuthenticated: false,
      setAuth: (auth) =>
        set({ auth, isAuthenticated: !!auth.accessToken }),
      logout: () => 
        set({ auth: { accessToken: null, username: null }, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);