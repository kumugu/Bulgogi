import { RegisterFormData } from "@/types/user/accountTypes";
import RegisterForm from "@/components/user/account/registerForm";
import { useState } from "react"
import Modal from "@/components/modal/ModalErrorMessage";

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (FormData: RegisterFormData) => {
    setLoading(true);
    setTimeout(() => {
      console.log("회원가입 성공", FormData.email, FormData.username, FormData.password, FormData.confirmPassword);
      setLoading(false);
    }, 2000);
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