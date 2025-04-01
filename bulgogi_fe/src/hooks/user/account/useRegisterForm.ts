import type React from "react"
import { useState, useEffect } from "react"
import type { RegisterFormData, ValidationErrors } from "@/types/user/accountTypes"
import { validateField, validateForm } from "@/utils/validation/registerValidation"

export const useRegisterForm = (onSubmit: (data: RegisterFormData) => Promise<void>) => {
  // 폼 데이터 상태
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    bio: "", // 선택적 필드 추가
  })

  // 유효성 검사 상태
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isFormValid, setIsFormValid] = useState(false)

  // 입력 필드 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // 필드가 수정되면 해당 필드를 touched로 표시
    if (!touched[name]) {
      setTouched((prev) => ({ ...prev, [name]: true }))
    }

    // 실시간 유효성 검사
    const error = validateField(name, value, formData)
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (error) {
        newErrors[name] = error
      } else {
        // 에러가 없으면 해당 키를 제거
        delete newErrors[name]
      }
      return newErrors
    })
  }

  // 필드 포커스 아웃 시 유효성 검사
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    const error = validateField(name, formData[name as keyof RegisterFormData] as string, formData)
    setErrors((prev) => {
      const newErrors = { ...prev }
      if (error) {
        newErrors[name] = error
      } else {
        // 에러가 없으면 해당 키를 제거
        delete newErrors[name]
      }
      return newErrors
    })
  }

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 모든 필드를 touched로 표시
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => {
        acc[key] = true
        return acc
      },
      {} as Record<string, boolean>,
    )
    setTouched(allTouched)

    // 폼 유효성 검사
    const formErrors = validateForm(formData)
    setErrors(formErrors)

    if (Object.keys(formErrors).length > 0) {
      return
    }

    // 폼 제출
    await onSubmit(formData)
  }

  // 폼 데이터가 변경될 때마다 유효성 검사
  useEffect(() => {
    // 필수 필드만 확인 (bio는 선택적)
    const requiredFields = ["email", "username", "password", "confirmPassword"]
    const allRequiredFieldsFilled = requiredFields.every((field) => formData[field as keyof RegisterFormData] !== "")

    // 실제 에러가 있는지 확인 (undefined가 아닌 값이 있는지)
    const hasErrors = Object.values(errors).some((error) => error !== undefined)

    // 디버깅을 위한 로그
    console.log("Form validation:", {
      allRequiredFieldsFilled,
      hasErrors,
      errors,
      isValid: allRequiredFieldsFilled && !hasErrors,
    })

    setIsFormValid(allRequiredFieldsFilled && !hasErrors)
  }, [formData, errors])

  return {
    formData,
    errors,
    touched,
    isFormValid,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}

