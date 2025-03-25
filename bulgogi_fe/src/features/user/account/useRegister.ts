import { useState } from "react";
import { RegisterRequest } from "@/types/user/accountTypes";
import { registerService } from "@/service/user/accountService";
import { CustomError } from "@/utils/CustomError";

// 회원가입
export const useRegister = () => {
  // 상태 관리: 로딩, 에러 메시지, 성공 메시지
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null); 

  const validateForm = (data: RegisterRequest) => {
    const { email, password, username } = data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //=====================================================================================================
    // 이메일 유효성 검사
    if (!emailRegex.test(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    //=====================================================================================================
    // 비밀번호 유효성 검사
    if (password.length < 8 || password.length > 20) {
      setError("비밀번호는 8자 이상 20자 이하로 입력해주세요.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("비밀번호에는 최소한 하나의 대문자가 포함되어야 합니다.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("비밀번호에는 최소한 하나의 소문자가 포함되어야 합니다.");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError("비밀번호에는 최소한 하나의 숫자가 포함되어야 합니다.");
      return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setError("비밀번호에는 최소한 하나의 특수문자(!@#$%^&*)가 포함되어야 합니다.");
      return;
    }

    //=====================================================================================================
    // 사용자 이름 유효성 검사
    if (!username) {
      setError("사용자 이름을 입력해주세요.");
      return;
    }

    // 길이 제한 (예: 2-20자)
    if (username.length < 2 || username.length > 20) {
      setError("사용자 이름은 2자 이상 20자 이하로 입력해주세요.");
      return;
    }

    // 알파벳, 숫자, 밑줄만 허용
    if (!/^[A-Za-z0-9]+$/.test(username)) {
      setError("사용자 이름은 영문, 숫자만 포함할 수 있습니다.");
      return;
    }

    // 공백 검사 (선택적)
    if (/\s/.test(username)) {
      setError("사용자 이름에는 공백을 포함할 수 없습니다.");
      return;
    }

    return null;  // 모든 검사를 통과하면 null 반환
  };


  // 회원가입 함수
  const register = async (data: RegisterRequest) => {
    setLoading(true); // 로딩 시작
    setError(null);  // 이전 에러 초기화
    setMessage(null); // 이전 메시지 초기화

    // 유효성 검사
    const validationError = validateForm(data);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const successMessage = await registerService(data);
      setMessage(successMessage);
    } catch (error: any) {
      const errorMessage = error instanceof CustomError ? error.message : "알 수 없는 오류가 발생했습니다.";
       setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, message };
};