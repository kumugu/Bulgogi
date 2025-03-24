import { RegisterFormData, RegisterRequest } from "@/types/user/accountTypes";
import React, { useState } from "react";

interface RegisterFormProps {
  onSubmit: (FormData: RegisterRequest) => void;
  loading: boolean;
  error?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading, error }) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    onSubmit({
      email: formData.email,
      password: formData.password,
      username: formData.username,
      profileImage: "/static/images/profile/pi1.png",
      bio: "Hello World!",
      role: "USER",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
          placeholder="이메일을 입력하세요"
          required
        />
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
          placeholder="사용자 이름을 입력하세요"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
          placeholder="비밀번호를 입력하세요"
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-lg py-2 px-4 text-white ${
            loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none`}
        >
          {loading ? "가입 중..." : "회원가입"}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
