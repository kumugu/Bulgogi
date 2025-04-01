import type React from "react"
import { Link } from "react-router-dom"

interface LoginFormHeaderProps {
  serverError?: string | null
}

const LoginFormHeader: React.FC<LoginFormHeaderProps> = ({ serverError }) => {
  return (
    <>
      <div className="text-center">
        <Link to="/" className="inline-block">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-neutral-900">Bulgogi</h2>
        </Link>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900">로그인</h2>
        <p className="mt-2 text-sm text-neutral-600">
          계정이 없으신가요?{" "}
          <Link to="/register" className="font-medium text-neutral-900 hover:underline">
            회원가입하기
          </Link>
        </p>
      </div>

      {/* 서버 에러 표시 */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">{serverError}</span>
        </div>
      )}
    </>
  )
}

export default LoginFormHeader

