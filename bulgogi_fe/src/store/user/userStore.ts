import { create } from "zustand";

interface UserState {
    userProfile: {
        username: string | null;
        bio: string | null;
        profileImage: string | null;
        deleted: boolean | null;
    };
    isProfileUpdated: boolean;
    setUserProfile: (profile: { username: string, bio: string; profileImage: string; deleted: boolean }) => void;
    setProfileUpdateStatus: (status: boolean) => void;
}

export const useUserStore = create<UserState>()((set) => ({
    userProfile: {
        username: null,
        bio: null,
        profileImage: null,
        deleted: null,
    },
    isProfileUpdated: false,
    setUserProfile: (profile) => set({ userProfile: profile }),
    setProfileUpdateStatus: (status) => set({ isProfileUpdated: status }),
}));