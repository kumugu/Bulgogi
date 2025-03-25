import React, { useState } from "react";
import { useLogin } from "@/features/user/auth/useLogin";
import Modal from "@/components/modal/ErrorMessage";
import ForgotPasswordLink from "@/components/user/auth/ForgotPasswordLing";
import SocialLogin from "@/components/user/auth/SocialLogin";
import TermsAndPrivacyAgreement from "@/components/user/auth/TermsAndPrivacyAgreement";
import LoginForm from "@/components/user/auth/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { login, errorMessage, setErrorMessage } = useLogin();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (email: string, password: string) => {
    setLoading(true);
    const loginSuccess = await login(email, password);
    setLoading(false);

    // 로그인 실패 시 에러 메시지를 설정
    if (!loginSuccess) {
      setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        {/* 로고 및 헤더 */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-neutral-900">Bulgogi</h2>
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900">어서오세요</h2>
          <p className="mt-2 text-sm text-neutral-600">
            계정이 없으신가요?{" "}
            <Link to="/register" className="font-medium text-neutral-900 hover:underline">
              지금 가입하기
            </Link>
          </p>
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
