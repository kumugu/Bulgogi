import type React from "react"
// 로그인 폼 데이터 타입
export interface LoginFormData {
  email: string
  password: string
}

// 로그인 응답 타입
export interface LoginResponse {
  accessToken: string
  refreshToken?: string
  username: string
  profileImageUrl: string
}

// 로그인 폼 컴포넌트 Props 타입
export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>
  loading: boolean
  serverError?: string | null
}

// 로그인 필드 컴포넌트 Props 타입
export interface LoginFieldProps {
  id: string
  label: string
  type: string
  placeholder: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onBlur: React.FocusEventHandler<HTMLInputElement>
  error?: string
  touched: boolean
  autoComplete?: string
  disabled?: boolean
}

// 유효성 검사 에러 타입
export interface LoginValidationErrors {
  [key: string]: string | undefined
}

