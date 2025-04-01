import type React from "react"
import type { RegisterFormProps } from "@/types/user/accountTypes"
import { useRegisterForm } from "@/hooks/user/account/useRegisterForm"
import RegisterField from "@/components/user/account/RegisterField"
import RegisterFormHeader from "@/components/user/account/RegisterFormHeader"
import { Loader2 } from "lucide-react"
import { Link } from "react-router-dom"

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading, serverError }) => {
  const { formData, errors, touched, isFormValid, handleChange, handleBlur, handleSubmit } = useRegisterForm(onSubmit)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        <RegisterFormHeader serverError={serverError} />

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md">
            {/* 이메일 필드 */}
            <RegisterField
              id="email"
              label="Email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email || false}
            />

            {/* 사용자 이름 필드 */}
            <RegisterField
              id="username"
              label="Username"
              type="text"
              placeholder="사용자 이름을 입력하세요"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.username}
              touched={touched.username || false}
            />

            {/* 비밀번호 필드 */}
            <RegisterField
              id="password"
              label="Password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password || false}
            />

            {/* 비밀번호 확인 필드 */}
            <RegisterField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              touched={touched.confirmPassword || false}
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="group relative flex w-full justify-center rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <p className="text-xs text-center text-neutral-500">
          계속 진행하면 Bulgogi의{" "}
          <Link to="/terms" className="text-neutral-900 hover:underline">
            서비스 약관
          </Link>
          과{" "}
          <Link to="/privacy" className="text-neutral-900 hover:underline">
            개인정보 처리방침
          </Link>
          에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  )
}

export default RegisterForm

