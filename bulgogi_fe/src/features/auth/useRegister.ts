import { useNavigate } from "react-router-dom";
import { api } from "@/api/axios";

export const useRegister = () => {
  const navigate = useNavigate();

  const register = async (
    email: string,
    password: string,
    username: string,
    profileImage: string,
    bio: string
  ) => {
    try {
      const response = await api.post("/users/register", {
        email,
        password,
        username,
        profileImage,
        bio,
        role: "USER",
      });

      if (response?.status === 200) {
        navigate("/login");  // 회원가입 후 로그인 페이지로 이동
      }
    } catch (error: any) {
      console.error("회원가입 실패", error.response?.data || error.message);
    }
  };

  return { register };
};
