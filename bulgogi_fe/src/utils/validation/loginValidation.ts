import type { LoginFormData, LoginValidationErrors } from "@/types/user/authTypes"

// 개별 필드 유효성 검사
export const validateLoginField = (name: string, value: string): string | undefined => {
  switch (name) {
    case "email":
      if (!value) {
        return "이메일을 입력해주세요"
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        return "유효한 이메일 주소를 입력해주세요"
      }
      return undefined

    case "password":
      if (!value) {
        return "비밀번호를 입력해주세요";
      } else if (value.length < 8) {
        return "비밀번호는 8자 이상이어야 합니다";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(value)) {
        return "비밀번호는 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다";
      }
      return undefined;

    default:
      return undefined
  }
}

// 전체 폼 유효성 검사
export const validateLoginForm = (formData: LoginFormData): LoginValidationErrors => {
  const errors: LoginValidationErrors = {}

  // 필수 필드 검증
  const fields = ["email", "password"] as const
  fields.forEach((field) => {
    const error = validateLoginField(field, formData[field])
    if (error) {
      errors[field] = error
    }
  })

  return errors
}

