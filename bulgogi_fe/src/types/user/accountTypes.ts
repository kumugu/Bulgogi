import type React from "react"
// 클라이언트 폼 데이터 타입
export interface RegisterFormData {
  email: string
  username: string
  password: string
  confirmPassword: string
  // 선택적 필드
  bio?: string
  profileImage?: string
}

// API 요청 타입 (서버에 실제로 보내는 데이터)
export interface RegisterRequest {
  email: string
  username: string
  password: string
  bio: string
  role: "USER" | "ADMIN"
  profileImage?: string
}

// API 응답 타입
export interface RegisterResponse {
  id: number
  email: string
  username: string
  profileImage: string
  bio: string
  role: "USER" | "ADMIN"
  createdAt: string
  updatedAt: string
}

// 비밀번호 변경 요청 타입
export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

// 계정 삭제 요청 타입
export interface DeleteAccountRequest {
  confirmPassword: string
}

// API 응답 공통 타입
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  status?: number
  data?: T
}

// 폼 컴포넌트 Props 타입
export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>
  loading: boolean
  serverError?: string
}

// 폼 필드 컴포넌트 Props 타입
export interface RegisterFieldProps {
  id: string
  label: string
  type: string
  placeholder: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onBlur: React.FocusEventHandler<HTMLInputElement>
  error?: string
  touched: boolean
}

// 유효성 검사 에러 타입
export interface ValidationErrors {
  [key: string]: string | undefined
}

