import { useState } from "react";
import { RegisterRequest, RegisterFormData, RegisterFormProps } from "@/types/user/accountTypes";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import SuccessModal from "@/components/modal/SuccessModal";
import ErrorModal from "@/components/modal/ErrorMessage";
import { useNavigate } from "react-router-dom";


const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading, error, message }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPasswordError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 비밀번호 확인 검사
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    // RegisterRequest로 변환 (confirmPassword 제거)
    const registerRequest: RegisterRequest = {
      email: formData.email,
      password: formData.password,
      username: formData.username,
      profileImage: formData.profileImage || "/static/images/profile/pi1.png", 
      bio: formData.bio || "Hello World!", 
      role: "USER", 
    };

    try {
      // register 호출 시 RegisterRequest 사용
      await onSubmit(registerRequest);
      // 성공 시 성공 모달 오픈
      setIsSuccessModalOpen(true); 
      setFormData({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      // 에러 시 에러 모달 오픈
      setIsErrorModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <Link to="/" className="inline-block">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-neutral-900">Bulgogi</h2>
        </Link>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900">회원가입</h2>
        <p className="mt-2 text-sm text-neutral-600">
          이미 계정이 있으신가요?{" "}
          <Link to="/login" className="font-medium text-neutral-900 hover:underline">
            로그인하기
          </Link>
        </p>
      </div>

      {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500 transition-all duration-300">{error}</div>
        )}

      {message && (
        <div className="rounded-lg bg-green-50 p-4 text-sm text-green-500 transition-all duration-300">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4 rounded-md">
          {/* Form Fields */}
          <div>
            <label htmlFor="email" className="text-sm font-serif text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900 sm:text-sm"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div>
            <label htmlFor="username" className="text-sm font-serif text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900 sm:text-sm"
              placeholder="사용자 이름을 입력하세요"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-serif text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900 sm:text-sm"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-sm font-serif text-gray-700">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900 sm:text-sm"
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>
        </div>

        {/* Error Messages */}
        {passwordError && <div className="text-red-500">{passwordError}</div>}

        {/* Error Modal */}
        {/* <ErrorModal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          message={error || "알 수 없는 오류가 발생했습니다."}
        /> */}

        {/* SuccesssModal */}
        {/* <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          onConfirm={() => {
            setIsSuccessModalOpen(false);
            navigate("/login"); // 회원가입 성공 시 로그인 페이지로 이동
          }}
          message={message || "회원가입이 성공적으로 완료되었습니다."}
        /> */}

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading} 
          className="group relative flex w-full justify-center rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {loading ? "가입 중..." : "회원가입"}
        </button>
      </form>

        <p className="text-xs text-center text-neutral-500">
          계속 진행하면 Bulgogi의{" "}
          <Link to="/terms" className="text-neutral-900 hover:underline">
            서비스 약관
          </Link>
          과{" "}
          <Link to="/privacy" className="text-neutral-900 hover:underline">
            개인정보 처리방침
          </Link>
          에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;