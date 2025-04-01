"use client"

import { useState } from "react"
import type { RegisterFormData, RegisterRequest } from "@/types/user/accountTypes"
import { register as registerApi } from "@/api/user/accountApi"
import { useAccountStore } from "@/store/user/accountStore"

export const useRegister = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { setAccountStatus } = useAccountStore()

  const registerUser = async (formData: RegisterFormData) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    setAccountStatus("pending")

    try {
      // 폼 데이터를 API 요청 데이터로 변환
      const registerData: RegisterRequest = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        bio: formData.bio || "",
        role: "USER",
        profileImage: formData.profileImage,
      }

      // API 직접 호출
      await registerApi(registerData)

      setSuccess("회원가입이 성공적으로 완료되었습니다.")
      setAccountStatus("success")
      return true
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "회원가입에 실패했습니다."
      setError(errorMessage)
      setAccountStatus("error")
      return false
    } finally {
      setLoading(false)
    }
  }

  return { registerUser, loading, error, success }
}

