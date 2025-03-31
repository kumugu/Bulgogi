import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-black-600 mb-4">로그인 오류</h2>
          <p className="text-gray-700 mb-6 text-center">{message}</p>
          <button
            onClick={onClose}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
