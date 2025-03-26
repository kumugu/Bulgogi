import { RegisterFormData, RegisterRequest } from "@/types/user/accountTypes";

export const convertToRegisterRequest = (formData: RegisterFormData): RegisterRequest => {
    return {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      bio: formData.bio ?? "Hell O world!",
      role: formData.role ?? "USER",     
      profileImage: formData.profileImage ?? "/static/images/default.png",
    };
  };

