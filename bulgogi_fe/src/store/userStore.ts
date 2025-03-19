import { create } from "zustand";
import { UserProfile, UpdateUserProfileRequest, ChangePasswordRequest, DeleteUserRequest } from "@/types/user";
import { api } from "@/api/axios";

interface UserState {
    user: UserProfile | null;
    fetchUserInfo: () => Promise<void>;
    updateUserInfo: (data: UpdateUserProfileRequest) => Promise<void>;
    changePassword: (data: ChangePasswordRequest) => Promise<void>;
    deleteUser: (data: DeleteUserRequest) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
    user: null,

    // 사용자 정보 가져오기
    fetchUserInfo: async () => {
        try {
            const response = await api.get<UserProfile>("/users/my-info");
            set({ user: response.data });
        } catch (error) {
            console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
        }
    },

    // 사용자 정보 업데이트
    updateUserInfo: async (data) => {
        try {
            const userId = get().user?.userId; // 상태에서 userId 가져오기
            if (!userId) throw new Error("User ID가 없습니다.");

            const response = await api.put<UserProfile>(`/users/my-info/${userId}`, data);
            set({ user: response.data });
        } catch (error) {
            console.error("사용자 정보 업데이트 실패", error);
        }
    },

    // 비밀번호 변경
    changePassword: async (data) => {
        try {
            const userId = get().user?.userId;
            if (!userId) throw new Error("User ID가 없습니다.");

            await api.put(`/users/change-password/${userId}`, data);
        } catch (error) {
            console.error("비밀번호 변경 실패", error);
        }
    },

    // 회원 탈퇴
    deleteUser: async (data: DeleteUserRequest) => {
        try {
            const userId = get().user?.userId;
            if (!userId) throw new Error("User ID가 없습니다.");

            await api.delete(`/users/delete-my-info/${userId}`, { data: data, });
            set({ user: null }); // 상태 초기화
        } catch (error) {
            console.error("회원 탈퇴 실패", error);
        }
    }
}));
