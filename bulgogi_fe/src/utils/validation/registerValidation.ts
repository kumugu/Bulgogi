import type { RegisterFormData, ValidationErrors } from "@/types/user/accountTypes"

// 개별 필드 유효성 검사
export const validateField = (name: string, value: string, formData: RegisterFormData): string | undefined => {
  switch (name) {
    case "email":
      if (!value) {
        return "이메일을 입력해주세요"
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        return "유효한 이메일 주소를 입력해주세요"
      }
      return undefined

    case "username":
      if (!value) {
        return "사용자 이름을 입력해주세요"
      } else if (value.length < 3) {
        return "사용자 이름은 3자 이상이어야 합니다"
      } else if (value.length > 20) {
        return "사용자 이름은 20자 이하여야 합니다"
      } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return "사용자 이름은 영문자, 숫자, 밑줄(_)만 포함할 수 있습니다"
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

    case "confirmPassword":
      if (!value) {
        return "비밀번호 확인을 입력해주세요"
      } else if (value !== formData.password) {
        return "비밀번호가 일치하지 않습니다"
      }
      return undefined

    // 선택적 필드는 값이 있을 때만 검증
    case "bio":
      if (value && value.length > 500) {
        return "자기소개는 500자 이하여야 합니다"
      }
      return undefined

    default:
      return undefined
  }
}

// 전체 폼 유효성 검사
export const validateForm = (formData: RegisterFormData): ValidationErrors => {
  const errors: ValidationErrors = {}

  // 필수 필드 검증
  const requiredFields = ["email", "username", "password", "confirmPassword"]
  requiredFields.forEach((field) => {
    const error = validateField(field, formData[field as keyof RegisterFormData] as string, formData)
    if (error) {
      errors[field] = error
    }
  })

  // 선택적 필드 검증 (값이 있는 경우만)
  if (formData.bio) {
    const bioError = validateField("bio", formData.bio, formData)
    if (bioError) {
      errors.bio = bioError
    }
  }

  return errors
}

