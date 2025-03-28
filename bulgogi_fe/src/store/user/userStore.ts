import { create } from "zustand";

interface userProfile {
        username: string | null;
        bio: string | null;
        profileImage: string | null;
        deleted: boolean;
}

interface UserState {
    userProfile: userProfile;
    isProfileUpdated: boolean;
    setUserProfile: (profile: Partial<userProfile>) => void;
    setProfileUpdateStatus: (status: boolean) => void;
}

export const useUserStore = create<UserState>()((set) => ({
    userProfile: {
        username: null,
        bio: null,
        profileImage: null,
        deleted: false,
    },
    isProfileUpdated: false,
    setUserProfile: (profile) => 
        set((state) => ({ 
        userProfile: { ...state.userProfile, ...profile },
        })),
    setProfileUpdateStatus: (status) => set({ isProfileUpdated: status }),
}));