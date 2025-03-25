import React from "react";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onConfirm();
    navigate("/login");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4">회원가입 성공!</h2>
        <p className="mb-4">회원가입이 완료되었습니다. 로그인 후 이용해주세요.</p>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
