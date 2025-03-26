import { AxiosError } from "axios";

interface ErrorResponse {
    message?: string;
}

export const getErrorMessage = (error: AxiosError<ErrorResponse>): string => {
    if (!error.response) return "네트워크 오류가 발생했습니다.";

    const { status, data } = error.response;

    // 유효성 검증 오류 처리 (Spring Validation 대응)  
    if (status === 400 && data?.message) {
        return data.message;
    }

    switch (status) {
        case 400:
            return data?.message || "잘못된 요청입니다. 이메일과 비밀번호를 확인해주세요.";
        case 401:
            return "비밀번호가 올바르지 않습니다.";
        case 403:
            if (data?.message === "탈퇴한 계정입니다.") 
                return "탈퇴한 계정입니다. 고객센터에 문의해주세요.";
            if (data?.message === "이메일을 찾을 수 없습니다.") 
                return "등록된 이메일이 없습니다.";
            if (data?.message === "비밀번호가 일치하지 않습니다.") 
                return "비밀번호가 일치하지 않습니다.";
            return "접근 권한이 없습니다.";
        case 404:
            return "사용자를 찾을 수 없습니다.";
        case 500:
            return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        default:
            return "알 수 없는 오류가 발생했습니다.";
    }
};
