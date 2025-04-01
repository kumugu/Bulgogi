import { changePasswordService } from "@/service/user/accountService";
import { ChangePasswordRequest } from "@/types/user/accountTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateNewPassword } from "@/utils/validation/passwordValidation";

export const useChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const changePassword = async (data: ChangePasswordRequest) => {
    const { oldPassword, newPassword } = data;

    // 유틸 함수로 비밀번호 검증 수행
    const validationError = validateNewPassword(newPassword, oldPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const successMessage = await changePasswordService(data);
      setMessage(successMessage);
      setTimeout(() => navigate("/user-settings"), 1000);
    } catch (error: any) {
      setError(error.message || "비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error, message };
};
