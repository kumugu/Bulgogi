import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterRequest } from "@/types/user/accountTypes";
import { registerService } from "@/service/user/accountService";

// 회원가입
export const useRegister = () => {
  const navigate = useNavigate();

  // 상태 관리: 로딩, 에러 메시지, 성공 메시지
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null); 

  // 회원가입 함수
  const register = async (data: RegisterRequest) => {
    setLoading(true); // 로딩 시작
    setError(null);  // 이전 에러 초기화
    setMessage(null); // 이전 메시지 초기화

    try {
      const successMessage = await registerService(data); // 회원가입 API 호출
      setMessage(successMessage);
      setTimeout(() => navigate("/login"), 1000); // 1초 후 로그인 페이지로 이동
    } catch (error: any) {
       setError(error.message || "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, message };
};