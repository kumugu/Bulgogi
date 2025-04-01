import type {
    RegisterRequest,
    ChangePasswordRequest,
    DeleteAccountRequest,
    ApiResponse,
  } from "@/types/user/accountTypes"
  import { api } from "../axios"
  
  // 회원가입
  export const register = async (registerData: RegisterRequest): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>("/users/register", registerData)
    return response.data
  }
  
  // 비밀번호 변경
  export const changePassword = async (passwordData: ChangePasswordRequest): Promise<ApiResponse<void>> => {
    const response = await api.put<ApiResponse<void>>("/users/change-password", passwordData)
    return response.data
  }
  
  // 계정 삭제
  export const deleteAccount = async (deleteData: DeleteAccountRequest): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>("/users/delete-my-account", { data: deleteData })
    return response.data
  }
  
  