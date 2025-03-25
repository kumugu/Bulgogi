// RegisterForm.tsx
import { useState } from "react";
import { RegisterFormData, RegisterRequest } from "@/types/user/accountTypes";
import { Loader2 } from "lucide-react";
import SuccessModal from "@/components/modal/SuccessModal";
import Modal from "@/components/modal/ErrorMessage";
import { register } from "module";

interface RegisterFormProps {
  onSubmit: (formData: RegisterFormData) => void;
  loading: boolean;
  error?: string;
  message?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading, error, message }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState<string | null>(null);

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
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setPasswordError(null);

    const { confirmPassword, ...registerRequest }: RegisterRequest = formData;

    const completeRegisterRequest: RegisterRequest = {
      ...registerRequest,
      bio: "Hello World!",
      role: "USER",
      profileImage: "/static/images/profile/pi1.png",
    };

    onSubmit(completeRegisterRequest);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Fields */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
          required
        />
      </div>

      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="사용자 이름을 입력하세요"
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
      </div>

      {/* Error Messages */}
      {passwordError && <div className="text-red-500">{passwordError}</div>}
      {error && <Modal message={error} onClose={() => {}} />}
      {message && <SuccessModal isOpen={true} onClose={() => {}} onConfirm={() => {}} />}

      {/* Submit Button */}
      <button type="submit" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : "회원가입"}
      </button>
    </form>
  );
};

export default RegisterForm;
