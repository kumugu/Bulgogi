// RegisterPage.tsx
import { useState, useEffect } from "react";
import RegisterForm from "@/components/user/account/RegisterForm";
import { useRegister } from "@/features/user/account/useRegister";
import { RegisterRequest, RegisterFormData } from "@/types/user/accountTypes";
import { Link, useNavigate } from "react-router-dom";
import SuccessModal from "@/components/modal/SuccessModal";
import Modal from "@/components/modal/ErrorMessage";

const RegisterPage = () => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const { register, loading, error, message: successMessage } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = (formData: RegisterFormData) => {
    // RegisterFormData에서 confirmPassword를 제외하고 RegisterRequest로 변환
    const { confirmPassword, ...registerRequest }: RegisterRequest = formData;
    register(registerRequest);
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
    if (successMessage) {
      setMessage(successMessage);
    }
  }, [error, successMessage]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <Link to="/" className="inline-block">
          <h2 className="text-4xl font-bold">Bulgogi</h2>
        </Link>
        <h2 className="mt-6 text-3xl font-bold">회원가입</h2>
        <p>
          이미 계정이 있으신가요? <Link to="/login">로그인하기</Link>
        </p>

        {errorMessage && <Modal message={errorMessage} onClose={() => setErrorMessage(undefined)} />}
        {message && <SuccessModal isOpen={true} onClose={() => setMessage(undefined)} onConfirm={() => navigate("/login")} />}

        <RegisterForm onSubmit={handleSubmit} loading={loading} error={errorMessage} message={message} />
      </div>
    </div>
  );
};

export default RegisterPage;
