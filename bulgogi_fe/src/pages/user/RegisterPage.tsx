import React from "react";
import RegisterForm from "@/components/user/account/RegisterForm";
import SuccessModal from "@/components/modal/SuccessModal";
import ErrorModal from "@/components/modal/ErrorMessage";
import { useRegister } from "@/hooks/user/account/useRegister";
import { RegisterFormData } from "@/types/user/accountTypes";
import { validateRegisterForm } from "@/utils/user/register/validators";
import { useModalStore } from "@/store/user/modalStore";
import { CustomError } from "@/utils/CustomError";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading } = useRegister();
  const { openModal, closeModal, type, isOpen, message } = useModalStore();

  const handleSubmit = async (formData: RegisterFormData) => {
    
    const validationError = validateRegisterForm(formData);
    if (validationError) {
      openModal("error", validationError);
      return;
    }

    try {
      await register(formData);
      openModal("success", "회원가입이 성공적으로 완료되었습니다.");
    } catch (error) {
      openModal("error", error instanceof CustomError ? error.message : "회원가입에 실패했습니다. 다시 시도해주세요.!!!!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-md">

        <RegisterForm 
          onSubmit={handleSubmit} 
          loading={loading} 
        />

        {/* 모달 처리 */}
        {type === "error" && (
          <ErrorModal
            isOpen={isOpen}
            onClose={closeModal}
            message={message || "오류 발생"}
          />
        )}
        {type === "success" && (
          <SuccessModal
            isOpen={isOpen}
            onClose={() => {
              closeModal();
              navigate("/login");
            }}
            onConfirm={() => {
              closeModal();
              navigate("/login");
            }}
            message={message || "회원가입이 성공적으로 완료되었습니다."}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
