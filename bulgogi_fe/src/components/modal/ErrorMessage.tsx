import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ 
  isOpen,
  onClose,
  message = "알 수 없는 오류가 발생했습니다."
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <AlertCircle className="text-red-500 w-16 h-16 mb-4" />
          <h2 className="text-xl font-bold mb-4 text-center">오류</h2>
          <p className="text-gray-600 mb-6 text-center">{message}</p>
          
          <div className="flex justify-center space-x-4 w-full">
            <button 
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
