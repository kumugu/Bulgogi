import { useState } from "react";
import { RegisterFormData, RegisterRequest } from "@/types/user/accountTypes";
import { registerService } from "@/service/user/accountService";
import { convertToRegisterRequest } from "@/utils/user/register/convertToRegisterRequest";

// 회원가입
export const useRegister = () => {
  // 상태 관리: 로딩, 에러 메시지, 성공 메시지
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // 회원가입 함수
  const register = async (data: RegisterFormData) => {
    setLoading(true); // 로딩 시작
    setError(""); // 이전 에러 초기화
    setMessage(""); // 이전 메시지 초기화

    try {
      const requestData: RegisterRequest = convertToRegisterRequest(data);
      const successMessage = await registerService(requestData);
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