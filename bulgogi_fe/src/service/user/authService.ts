import { login, refreshAccessToken, logout } from "@/api/user/authApi"
import { useAuthStore } from "@/store/user/authStore"
import { tokenUtils } from "@/utils/user/auth/tokenUtils"
import { AxiosError } from "axios"

// 로그인 서비스
const loginService = async (email: string, password: string) => {
  try {
    const response = await login(email, password)
    const { accessToken, username, profileImageUrl } = response

    tokenUtils.setToken(accessToken)
    useAuthStore.getState().setAuth({
      accessToken,
      username,
      profileImage: profileImageUrl,
    })
    return response
  } catch (error) {
    // 에러를 그대로 전달하여 상위 레벨에서 처리할 수 있도록 함
    throw error
  }
}

// 토큰 갱신 서비스
const refreshTokenService = async () => {
  try {
    const response = await refreshAccessToken()

    if (!response?.accessToken) {
      console.error("accessToken 갱신 실패")
      // 로그아웃 처리
      await logoutService()
      return null
    }

    // 새로운 토큰 처리
    tokenUtils.setToken(response.accessToken)
    return response.accessToken
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("토큰 갱신 중 오류 발생", error.response?.data || error.message)
    } else {
      console.error("알 수 없는 오류 발생", error)
    }
    // 로그아웃 처리
    await logoutService()
    return null
  }
}

// 로그아웃 서비스
const logoutService = async () => {
  try {
    await logout()

    // 토큰 및 세션 처리
    tokenUtils.removeToken()
    sessionStorage.removeItem("accessToken")
    useAuthStore.getState().resetAuthState()

    return true
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("로그아웃 중 오류 발생", error.response?.data || error.message)
    } else {
      console.error("알 수 없는 오류 발생", error)
    }

    // 로그아웃 실패해도 클라이언트 측에서는 로그아웃 처리
    tokenUtils.removeToken()
    sessionStorage.removeItem("accessToken")
    useAuthStore.getState().resetAuthState()

    return false
  }
}

export { loginService, refreshTokenService, logoutService }

