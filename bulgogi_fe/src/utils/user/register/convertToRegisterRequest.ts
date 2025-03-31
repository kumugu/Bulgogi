import { RegisterFormData, RegisterRequest } from "@/types/user/accountTypes";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constants/constants";

export const convertToRegisterRequest = (formData: RegisterFormData): RegisterRequest => {
    return {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      bio: formData.bio ?? "Hell O world!",
      role: formData.role ?? "USER",     
      profileImage: formData.profileImage ?? DEFAULT_PROFILE_IMAGE,
    };
  };

