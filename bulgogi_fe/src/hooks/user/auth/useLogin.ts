import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/user/authStore"
import { useUserStore } from "@/store/user/userStore"
import { loginService } from "@/service/user/authService"
import type { LoginFormData } from "@/types/user/authTypes"
import axios from "axios"
import { getErrorMessage } from "@/utils/user/login/loginErrorMessage "

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setAuth } = useAuthStore()
  const { setUserProfile } = useUserStore()
  const navigate = useNavigate()

  const login = async (formData: LoginFormData) => {
    setLoading(true)
    setError(null)

    try {
      const user = await loginService(formData.email, formData.password)

      // 로그인 성공 시 프로필 이미지 포함
      setAuth({
        accessToken: user.accessToken,
        username: user.username,
        profileImage: user.profileImageUrl,
      })

      // 사용자 프로필 정보 업데이트
      setUserProfile({
        username: user.username,
        profileImageUrl: user.profileImageUrl,
      })

      navigate("/")
      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = getErrorMessage(error)
        console.log("로그인 에러 상세 정보:", {
          status: error.response?.status,
          data: error.response?.data,
          message: errorMessage,
        })
        setError(errorMessage)
      } else {
        console.error("예상치 못한 로그인 오류:", error)
        setError("예상치 못한 오류가 발생했습니다. 다시 시도해주세요.")
      }
      return false
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}

