import { create } from "zustand";

// 모달 상태 타입 정의
interface ModalState {
    isOpen: boolean;
    type: "success" | "error" | null;
    message: string | null;
    openModal: (type: "success" | "error", message: string) => void;
    closeModal: () => void;
}

// Store 생성
export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    type: null,
    message: null,
    openModal: (type, message) => 
        set({ isOpen: true, type, message }),
    closeModal: () => 
        set({ isOpen: false, type: null, message: null }),
}));