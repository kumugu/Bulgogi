import { useState } from "react"
import { useNavigate } from "react-router-dom"
import RegisterForm from "@/components/user/account/RegisterForm"
import RegisterFormSuccess from "@/components/user/account/RegisterFormSuccess"
import type { RegisterFormData } from "@/types/user/accountTypes"
import { useRegister } from "@/hooks/user/account/useRegister"

const RegisterPage = () => {
  const navigate = useNavigate()
  const { registerUser, loading, error, success } = useRegister()
  const [showForm, setShowForm] = useState(true)

  const handleRegister = async (formData: RegisterFormData) => {
    const isSuccess = await registerUser(formData)
    if (isSuccess) {
      setShowForm(false)
      // 회원가입 성공 시 로그인 페이지로 이동
      setTimeout(() => {
        navigate("/login", { state: { message: "회원가입이 완료되었습니다. 로그인해주세요." } })
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {showForm ? (
        <RegisterForm onSubmit={handleRegister} loading={loading} serverError={error || undefined} />
      ) : (
        <div className="w-full max-w-md">
          <RegisterFormSuccess message={success || "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다."} />
        </div>
      )}
    </div>
  )
}

export default RegisterPage

