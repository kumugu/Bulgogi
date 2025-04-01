import { register, changePassword, deleteAccount } from "@/api/user/accountApi"
import type {
  RegisterFormData,
  RegisterRequest,
  ChangePasswordRequest,
  DeleteAccountRequest,
} from "@/types/user/accountTypes"
import { CustomError } from "@/utils/CustomError"

// 폼 데이터를 API 요청 데이터로 변환
const transformRegisterData = (formData: RegisterFormData): RegisterRequest => {
  return {
    email: formData.email,
    username: formData.username,
    password: formData.password,
    bio: formData.bio || "", // 기본값 설정
    role: "USER", // 기본 역할 설정
    profileImage: formData.profileImage,
  }
}

// 회원가입 서비스
export const registerService = async (formData: RegisterFormData): Promise<string> => {
  try {
    // 폼 데이터를 API 요청 데이터로 변환
    const registerData = transformRegisterData(formData)

    // API 호출
    await register(registerData)
    return "회원가입이 성공적으로 완료되었습니다."
  } catch (error: any) {
    // API 에러 처리
    const errorMessage = error.response?.data?.message || "회원가입에 실패했습니다."
    throw new CustomError(errorMessage)
  }
}

// 비밀번호 변경 서비스
export const changePasswordService = async (passwordData: ChangePasswordRequest): Promise<string> => {
  try {
    await changePassword(passwordData)
    return "비밀번호가 성공적으로 변경되었습니다."
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "비밀번호 변경에 실패했습니다."
    throw new CustomError(errorMessage)
  }
}

// 계정 삭제 서비스
export const deleteAccountService = async (deleteData: DeleteAccountRequest): Promise<string> => {
  try {
    await deleteAccount(deleteData)
    return "회원 탈퇴가 성공적으로 처리되었습니다."
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "회원 탈퇴에 실패했습니다."
    throw new CustomError(errorMessage)
  }
}