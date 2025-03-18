import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/axios";
import { RegisterRequest, RegisterResponse } from "@/api/types";

export const useRegister = () => {
  const navigate = useNavigate();

  // 상태 관리 추가
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null); 

  const register = async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await api.post<RegisterResponse>("/users/register", data);

      if (response?.status === 201) {
        setMessage("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다."); 
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error: any) {
      console.error("회원가입 실패", error.response?.data || error.message);
      
      setError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요");

      if (error.response?.status === 400) {
        setError("입력값이 올바르지 않습니다. 다시 확인해주세요.");
      } else if (error.response?.status === 409) {
        setError("이미 사용 중인 이메일입니다.");
      } 
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, message };
};