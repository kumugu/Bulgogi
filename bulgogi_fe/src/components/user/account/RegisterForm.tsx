import { useState } from "react";
import { RegisterFormData, RegisterFormProps } from "@/types/user/accountTypes";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return;
    }
    await onSubmit(formData);
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