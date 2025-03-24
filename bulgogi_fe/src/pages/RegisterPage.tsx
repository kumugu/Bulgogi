import { useState } from "react";
import RegisterForm from "@/components/user/account/RegisterForm";
import Modal from "@/components/modal/ModalErrorMessage";
import { useRegister } from "@/features/user/account/useRegister";
import { RegisterRequest } from "@/types/user/accountTypes";
const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, loading, error, message } = useRegister();

  const handleSubmit = (formData: RegisterRequest) => {
    register(formData); // register 훅을 사용하여 회원가입
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold text-neutral-900">Bulgogi</h2>
          <h2 className="mt-6 text-3xl font-bold text-neutral-900">Register</h2>
        </div>

        {errorMessage && <Modal message={errorMessage} onClose={() => setErrorMessage(null)} />}

        <RegisterForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default RegisterPage;
