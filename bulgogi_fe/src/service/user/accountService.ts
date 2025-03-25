import { register, changePassword, deleteAccount } from "@/api/user/accountApi";
import { ChangePasswordRequest, DeleteAccountRequest, RegisterRequest, RegisterResponse, AccountApiResponse } from "@/types/user/accountTypes";
import { AxiosError } from "axios";
import { CustomError } from "@/utils/CustomError";

// 회원가입 서비스
const registerService = async (registerData: RegisterRequest): Promise<string> => {
  try {
    await register(registerData);
    return "회원가입이 성공적으로 완료되었습니다.";
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = error.response?.data as AccountApiResponse;

      if (response) {
        const { status, message } = response;

        switch (status) {
          case 400:
            const badRequestError = message || "입력값이 올바르지 않습니다. 다시 확인해주세요.";
            throw new CustomError(badRequestError);
          case 409:
            const duplicateError = message || "이미 사용 중인 이메일입니다.";
            throw new CustomError(duplicateError);
          case 500:
            throw new CustomError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          default:
            // 비밀번호 관련 오류 처리
            if (message?.includes("비밀번호") || message?.includes("password")) {
              throw new CustomError("비밀번호 조건을 확인해주세요. 최소 8자 이상, 대소문자, 숫자 및 특수문자를 포함해야 합니다.");
            }
            throw new CustomError(message || "회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      }
    }

    throw new CustomError("예상치 못한 오류가 발생했습니다.");
  }
};

// 비밀번호 변경 서비스
const changePasswordService = async (passwordData: ChangePasswordRequest): Promise<string> => {
  try {
    await changePassword(passwordData);
    return "비밀번호가 성공적으로 변경되었습니다.";
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = error.response?.data as AccountApiResponse;
      
      if (response) {
        switch (error.response?.status) {
          case 400:
            return "입력값이 올바르지 않습니다. 다시 확인해주세요.";
          case 401:
            return "현재 비밀번호가 올바르지 않습니다.";
          default:
            return response.message || "비밀번호 변경에 실패했습니다. 다시 시도해주세요.";
        }
      }
    }
    return "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
  }
};

// 계정 삭제 서비스
const deleteAccountService = async (deleteData: DeleteAccountRequest): Promise<string> => {
  try {
    await deleteAccount(deleteData);
    return "회원 탈퇴가 성공적으로 처리되었습니다.";
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = error.response?.data as AccountApiResponse;

      console.error("회원 탈퇴 중 오류 발생:", response?.message || error.message);

      throw new CustomError(response?.message || "회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    } else {
      console.error("회원 탈퇴 중 알 수 없는 오류 발생:", error);
      throw new CustomError("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  }
};

export { registerService, changePasswordService, deleteAccountService };
