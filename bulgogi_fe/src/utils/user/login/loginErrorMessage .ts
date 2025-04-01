import type { AxiosError } from "axios"

interface ErrorResponse {
  message?: string
  error?: string
  status?: number
  code?: string
}

// 로그인 에러 코드에 따른 사용자 친화적인 메시지 매핑
const errorMessages: Record<string, string> = {
  USER_NOT_FOUND: "존재하지 않는 이메일입니다. 이메일을 확인해주세요.",
  INVALID_PASSWORD: "비밀번호가 일치하지 않습니다. 다시 확인해주세요.",
  ACCOUNT_LOCKED: "계정이 잠겼습니다. 관리자에게 문의하세요.",
  ACCOUNT_DISABLED: "비활성화된 계정입니다. 이메일 인증을 완료해주세요.",
  EMAIL_NOT_VERIFIED: "이메일 인증이 필요합니다. 인증 메일을 확인해주세요.",
  TOO_MANY_ATTEMPTS: "로그인 시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.",
  INVALID_CREDENTIALS: "이메일 또는 비밀번호가 올바르지 않습니다.",
}

// HTTP 상태 코드에 따른 기본 메시지
const statusMessages: Record<number, string> = {
  400: "잘못된 요청입니다. 입력 정보를 확인해주세요.",
  401: "인증에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
  403: "접근 권한이 없습니다. 이메일과 비밀번호를 확인해주세요.",
  404: "요청한 리소스를 찾을 수 없습니다.",
  429: "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.",
  500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
}

/**
 * 에러 응답에서 사용자 친화적인 메시지를 추출합니다.
 */
export const getErrorMessage = (error: AxiosError): string => {
  // 응답이 없는 경우 (네트워크 오류 등)
  if (!error.response) {
    return "서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요."
  }

  const { status } = error.response
  const data = error.response.data as ErrorResponse

  // 1. 서버에서 제공하는 에러 코드가 있는 경우
  if (data.code && errorMessages[data.code]) {
    return errorMessages[data.code]
  }

  // 2. 서버에서 제공하는 에러 메시지가 있는 경우
  if (data.message) {
    return data.message
  }

  // 3. 에러 객체에 메시지가 있는 경우
  if (data.error) {
    return data.error
  }

  // 4. HTTP 상태 코드에 따른 기본 메시지
  if (status && statusMessages[status]) {
    return statusMessages[status]
  }

  // 5. 기본 메시지
  return "로그인 중 오류가 발생했습니다. 다시 시도해주세요."
}

