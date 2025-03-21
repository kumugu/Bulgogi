import React from "react";

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-70 backdrop-blur-sm z-50">
      <div className="w-80 rounded-lg bg-neutral-900 p-6 shadow-lg border border-neutral-300">
        {/* 모달 내용 */}
        <p className="text-neutral-100">{message}</p>

        {/* 버튼 */}
        <button
          onClick={onClose}
            className="mt-4 w-full rounded-lg bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-700 transition"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
