import React from "react";
import { AlertCircle } from "lucide-react";
import { useModalStore } from "@/store/user/modalStore";

const ErrorModal = () => {
  const { isOpen, message, type, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold text-black-600">로그인 오류</h2>
          </div>

          {/* 에러 타입에 따라 다른 아이콘과 스타일 */}
          {type === "error" && (
            <AlertCircle className="text-red-500 mb-4" size={40} />
          )}

          <p className="text-gray-700 mb-6 text-center">{message}</p>

          <div className="flex justify-center space-x-4 w-full">
            <button
              onClick={closeModal}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
