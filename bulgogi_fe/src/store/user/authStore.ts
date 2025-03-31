import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Auth 상태 타입 정의
interface AuthState {
  auth: {
    accessToken: string | null;
    username: string | null;
    profileImage: string | null; // null 허용
  };
  setAuth: (auth: { accessToken: string | null; username: string | null; profileImage: string | null }) => void;
  logout: () => void;
  resetAuthState: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 초기 상태
      auth: {
        accessToken: null,
        username: null,
        profileImage: null, // 초기값 null
      },
      // 인증 상태 설정
      setAuth: (auth) => {
        set({
          auth: {
            accessToken: auth.accessToken || null,
            username: auth.username || null,
            profileImage: auth.profileImage || null, // 기본값 설정
          },
        });
      },
      // 로그아웃 처리
      logout: () => {
        set({
          auth: { accessToken: null, username: null, profileImage: null }, // 초기화
        });
        sessionStorage.removeItem("auth-storage");
      },
      // 상태 초기화 처리
      resetAuthState: () => {
        set({
          auth: { accessToken: null, username: null, profileImage: null }, // 초기화
        });
        sessionStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage", // 스토리지 이름
      storage: createJSONStorage(() => sessionStorage), // 세션 스토리지를 사용
    }
  )
);
