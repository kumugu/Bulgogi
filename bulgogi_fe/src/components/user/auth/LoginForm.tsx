import type React from "react"
import { useEffect} from "react"
import type { LoginFormProps } from "@/types/user/authTypes"
import { useLoginForm } from "@/hooks/user/auth/useLoginForm"
import LoginField from "@/components/user/auth/LoginField"
import LoginFormHeader from "@/components/user/auth/LoginFormHeader"
import { Loader2 } from "lucide-react"
import { Link } from "react-router-dom"


const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, serverError }) => {
  const { formData, errors, touched, isFormValid, handleChange, handleBlur, handleSubmit, resetForm } =
    useLoginForm(onSubmit)

  // 서버 에러가 변경될 때마다 폼 필드 초기화 여부 결정
  useEffect(() => {
    // 특정 에러 메시지에 따라 필드 초기화 처리
    if (serverError?.includes("비밀번호가 일치하지 않습니다")) {
      // 비밀번호만 초기화
      resetForm({ keepEmail: true })
    } else if (serverError?.includes("존재하지 않는 이메일")) {
      // 전체 폼 초기화
      resetForm()
    }
  }, [serverError, resetForm])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        <LoginFormHeader serverError={serverError} />

        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
          <div className="space-y-4 rounded-md">
            {/* 이메일 필드 */}
            <LoginField
              id="email"
              label="이메일"
              type="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email || false}
              autoComplete="username"
              disabled={loading}
            />

            {/* 비밀번호 필드 */}
            <LoginField
              id="password"
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password || false}
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {/* 비밀번호 찾기 링크 */}
          <div className="flex items-center justify-end">
            <Link to="/forgot-password" className="text-sm text-neutral-900 hover:underline">
              비밀번호를 잊으셨나요?
            </Link>
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="group relative flex w-full justify-center rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <p className="text-xs text-center text-neutral-500">
          로그인함으로써 Bulgogi의{" "}
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

export default LoginForm

