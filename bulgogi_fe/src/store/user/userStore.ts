import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserProfile {
  username: string | null;
  bio: string | null;
  profileImage: string | null;
  profileImageUrl: string | null;
}

interface UserState {
  userProfile: UserProfile;
  isProfileUpdated: boolean;
  setUserProfile: (profile: Partial<UserProfile>) => void;
  setProfileUpdateStatus: (status: boolean) => void;
  setProfileImageUrl: (url: string | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userProfile: {
        username: null,
        bio: null,
        profileImage: null,
        profileImageUrl: null,
      },
      isProfileUpdated: false,
      setUserProfile: (profile) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...profile },
        })),
      setProfileUpdateStatus: (status) => set({ isProfileUpdated: status }),
      setProfileImageUrl: (url) =>
        set((state) => ({
          userProfile: { ...state.userProfile, profileImageUrl: url },
        })),
    }),
    {
      name: "user-storage", 
      storage: createJSONStorage(() => sessionStorage), // 또는 sessionStorage
    }
  )
);





