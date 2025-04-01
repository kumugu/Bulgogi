import { useState } from "react";
import { getUserBio, updateUserBio } from "@/api/user/userApi";

export const useUpdateBio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const updateBio = async (editedBio: string) => {
    setIsLoading(true);
    try {
      const response = await updateUserBio({ bio: editedBio });
      setMessage({ text: "자기소개가 성공적으로 변경되었습니다.", type: "success" });
      return response; // 필요한 데이터를 반환할 수 있음
    } catch (error) {
      setMessage({ text: "자기소개 변경에 실패했습니다.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    message,
    updateBio,
  };
};
