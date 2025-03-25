import { useState } from "react";
import { RegisterFormData, RegisterRequest } from "@/types/user/accountTypes";
import { registerService } from "@/service/user/accountService";

// 회원가입
export const useRegister = () => {
  // 상태 관리: 로딩, 에러 메시지, 성공 메시지
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // 유효성 검사 함수
  const validateForm = (data: RegisterFormData): string | null => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return "올바른 이메일 형식을 입력해주세요.";
    } else if (data.password.length < 8 || data.password.length > 20) {
      return "비밀번호는 8자 이상 20자 이하로 입력해주세요.";
    } else if (!/[A-Z]/.test(data.password)) {
      return "비밀번호에는 최소한 하나의 대문자가 포함되어야 합니다.";
    } else if (!/[a-z]/.test(data.password)) {
      return "비밀번호에는 최소한 하나의 소문자가 포함되어야 합니다.";
    } else if (!/[0-9]/.test(data.password)) {
      return "비밀번호에는 최소한 하나의 숫자가 포함되어야 합니다.";
    } else if (!/[!@#$%^&*]/.test(data.password)) {
      return "비밀번호에는 최소한 하나의 특수문자(!@#$%^&*)가 포함되어야 합니다.";
    } else if (!data.username) {
      return "사용자 이름을 입력해주세요.";
    } else if (data.username.length < 2 || data.username.length > 20) {
      return "사용자 이름은 2자 이상 20자 이하로 입력해주세요.";
    } else if (!/^[A-Za-z0-9]+$/.test(data.username)) {
      return "사용자 이름은 영문, 숫자만 포함할 수 있습니다.";
    } else if (/\s/.test(data.username)) {
      return "사용자 이름에는 공백을 포함할 수 없습니다.";
    } else if (data.password !== data.confirmPassword) {
      return "비밀번호와 확인 비밀번호가 일치하지 않습니다.";
    }
    return null;
  };

  // 회원가입 함수
  const register = async (data: RegisterFormData) => {
    setLoading(true); // 로딩 시작
    setError(""); // 이전 에러 초기화
    setMessage(""); // 이전 메시지 초기화

    // 유효성 검사
    const validationError = validateForm(data);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    // RegisterRequest로 변환 (confirmPassword 제외)
    const registerRequest: RegisterRequest = {
      email: data.email,
      username: data.username,
      password: data.password,
      bio: data.bio || "Hello World!", 
      role: data.role || "USER",       
      profileImage: data.profileImage || "/static/images/profile/default.png", 
    };
    
    try {
      const successMessage = await registerService(registerRequest);
      setMessage(successMessage);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || "알 수 없는 오류가 발생했습니다.";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, message };
};