import React from "react";
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  message = "성공적으로 완료되었습니다."
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-center">성공</h2>
          <p className="text-gray-600 mb-6 text-center">{message}</p>
          
          <div className="flex justify-center space-x-4 w-full">
            <button 
              onClick={onConfirm}
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

export default SuccessModal;
