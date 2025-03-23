import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  auth: {
    accessToken: string | null;
    username: string | null;
  };
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
      setAuth: (auth) =>
        set({ auth }),
      logout: () =>  {
        set({ auth: { accessToken: null, username: null } });
        sessionStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage", 
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);