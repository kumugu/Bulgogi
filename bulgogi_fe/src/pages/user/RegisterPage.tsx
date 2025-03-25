import { useRegister } from "@/features/user/account/useRegister";
import { RegisterRequest, RegisterFormData } from "@/types/user/accountTypes";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import RegisterForm from "@/components/user/account/RegisterForm";
import SuccessModal from "@/components/modal/SuccessModal";
import ErrorModal from "@/components/modal/ErrorMessage";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading, error, message } = useRegister();

  // 모달 상태 관리
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleSubmit = async (registerRequest: RegisterRequest) => {
    try {
      // RegisterRequest를 RegisterFormData로 변환
      const registerFormData: RegisterFormData = {
        email: registerRequest.email,
        username: registerRequest.username,
        password: registerRequest.password,
        confirmPassword: registerRequest.password, 
        bio: registerRequest.bio,
        role: registerRequest.role,
        profileImage: registerRequest.profileImage,
      };
      // register 호출
      await register(registerFormData);

      // 
      if (!error) {
        setSuccessModalOpen(true);
      }
    } catch (error) {
      setErrorModalOpen(true);
    }
  };

  const handleSuccessConfirm = () => {
    // 성공 모달 닫기 및 로그인 페이지로 리다이렉트
    setSuccessModalOpen(false);
    navigate('/login');
  };

  const handleErrorClose = () => {
    // 에러 모달 닫기
    setErrorModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-md">

        <RegisterForm 
          onSubmit={handleSubmit} 
          loading={loading} 
        />

        {/* 성공 모달 */}
        {/* <SuccessModal
          isOpen={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          onConfirm={handleSuccessConfirm}
          message={message || "회원가입이 성공적으로 완료되었습니다."} 
        /> */}

        {/* 에러 모달 */}
        {/* <ErrorModal
          isOpen={errorModalOpen}
          onClose={handleErrorClose}
          message={error || "알 수 없는 오류가 발생했습니다."}
        /> */}
      </div>
    </div>
  );
};

export default RegisterPage;
