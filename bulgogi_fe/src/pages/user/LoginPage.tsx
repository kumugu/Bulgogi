import type React from "react"
import LoginForm from "@/components/user/auth/LoginForm"
import type { LoginFormData } from "@/types/user/authTypes"
import { useLogin } from "@/hooks/user/auth/useLogin"

const LoginPage: React.FC = () => {
  const { login, loading, error } = useLogin()

  const handleLogin = async (formData: LoginFormData) => {
    await login(formData)
  }

  return <LoginForm onSubmit={handleLogin} loading={loading} serverError={error} />
}

export default LoginPage

