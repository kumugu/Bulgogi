import { login } from "@/api/user/authApi";
import { tokenUtils } from "@/utils/tokenUtils";
import { AxiosError } from "axios";

// 로그인 서비스
const loginService = async (email: string, password: string) => {
    try {
        const response = await login(email, password);

        if (!response?.accessToken) {
            console.error("accessToken이 반환되지 않음");
            return null;
        }

        const { accessToken } = response;
        const decoded = tokenUtils.setToken(accessToken);

        if (decoded) {
            return { accessToken, username: decoded.username };
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            let message = '로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.';

            switch (error.response?.status) {
                case 400:
                    message = error.response?.data?.message || "잘못된 요청입니다. 이메일과 비밀번호를 확인해주세요.";
                    break;

                case 401:
                    message = "비밀번호가 올바르지 않습니다.";
                    break;

                case 403:
                    if (error.response?.data?.message === "탈퇴한 계정입니다.") {
                        message = "탈퇴한 계정입니다. 고객센터에 문의해주세요.";

                    } else if (error.response?.data?.message === "이메일을 찾을 수 없습니다.") {
                        message = "등록된 이메일이 없습니다. 이메일을 확인해주세요.";

                    } else if (error.response?.data?.message === "비밀번호가 일치하지 않습니다.") {
                        message = "비밀번호가 일치하지 않습니다. 비밀번호를 확인해주세요.";

                    } else {
                        message = "접근 권한이 없습니다.";
                    }
                    break;

                case 404:
                    message = "사용자를 찾을 수 없습니다.";
                    break;

                case 500:
                    message = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
                    break;
                }
                throw new Error(message);
            }
        }
        return null;
    };


    export { loginService }