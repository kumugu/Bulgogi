import React, { useState } from "react";
import Modal from "@/components/modal/ModalErrorMessage";
import ForgotPasswordLink from "@/components/user/auth/ForgotPasswordLing";
import SocialLogin from "@/components/user/auth/SocialLogin";
import TermsAndPrivacyAgreement from "@/components/user/auth/TermsAndPrivacyAgreement";
import LoginForm from "@/components/user/auth/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (email: string, password: string) => {
    setLoading(true);
    setTimeout(() => {
      console.log("로그인 성공", email, password);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold text-neutral-900">Bulgogi</h2>
          <h2 className="mt-6 text-3xl font-bold text-neutral-900">Welcome!</h2>
        </div>

        {errorMessage && <Modal message={errorMessage} onClose={() => setErrorMessage(null)} />}

        <LoginForm onSubmit={handleSubmit} loading={loading} />
        <ForgotPasswordLink />
        <SocialLogin />
        <TermsAndPrivacyAgreement />

        <p className="mt-2 text-sm text-neutral-600">
          아직 계정이 없으신가요?{" "}
          <Link to="/register" className="font-medium text-neutral-900 hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;