import { create } from "zustand";

interface AdminState {
    users: Array<any>;
    userUpdateStatus: "pending" | "success" | "error" | null;
    setUsers: (users: Array<any>) => void;
    setUserUpdateStatus: (status: "pending" | "success" | "error" | null) => void;
}

export const useAdminStore = create<AdminState>()((set) => ({
    users: [],
    userUpdateStatus: null,
    setUsers: (users) => set({ users }),
    setUserUpdateStatus: (status) => set({ userUpdateStatus: status }),
}));