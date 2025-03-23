import { create } from "zustand";

interface AccountState {
    accountStatus: "pending" | "success" | "error" | null;
    errorMessage: string | null;
    setAccountStatus: (status: "pending" | "success" | "error" | null) => void;
    setErrorMessage: (message: string | null) => void;
}

export const useAccountStore = create<AccountState>()((set) => ({
    accountStatus: null,
    errorMessage: null,
    setAccountStatus: (status) => set({ accountStatus: status }),
    setErrorMessage: (message) => set({ errorMessage: message }),
}));