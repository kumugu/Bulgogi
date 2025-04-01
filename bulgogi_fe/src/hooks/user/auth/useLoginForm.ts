import type React from "react"
import { useState, useEffect, useCallback } from "react"
import type { LoginFormData, LoginValidationErrors } from "@/types/user/authTypes"
import { validateLoginField, validateLoginForm } from "@/utils/validation/loginValidation"


interface ResetOptions {
  keepEmail?: boolean
}

export const useLoginForm = (onSubmit: (data: LoginFormData) => Promise<void>) => {
  // 폼 데이터 상태
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })

  // 유효성 검사 상태
  const [errors, setErrors] = useState<LoginValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isFormValid, setIsFormValid] = useState(false)

  // 폼 초기화 함수
  const resetForm = useCallback(
    (options?: ResetOptions) => {
      const { keepEmail = false } = options || {}

      setFormData((prev) => ({
        email: keepEmail ? prev.email : "",
        password: "",
      }))

      setErrors({})
      setTouched({
        email: keepEmail ? touched.email : false,
        password: false,
      })
    },
    [touched],
  )

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
    const error = validateLoginField(name, value)
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

    const error = validateLoginField(name, formData[name as keyof LoginFormData])
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
    const formErrors = validateLoginForm(formData)
    setErrors(formErrors)

    if (Object.keys(formErrors).length > 0) {
      return
    }

    // 폼 제출
    await onSubmit(formData)
  }

  // 폼 데이터가 변경될 때마다 유효성 검사
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => value !== "")
    const hasErrors = Object.values(errors).some((error) => error !== undefined)

    setIsFormValid(allFieldsFilled && !hasErrors)
  }, [formData, errors])

  return {
    formData,
    errors,
    touched,
    isFormValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  }
}

