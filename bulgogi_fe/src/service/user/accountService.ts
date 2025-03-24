import { register, changePassword, deleteAccount } from "@/api/user/accountApi";
import { ChangePasswordRequest, DeleteAccountRequest, RegisterRequest } from "@/types/user/accountTypes";
import { AxiosError } from "axios";


// 회원가입 서비스
const registerService = async (registerData: RegisterRequest): Promise<string> => {
    try {
      await register(registerData);
      return "회원가입이 성공적으로 완료되었습니다.";
    } catch (error) {
      if (error instanceof AxiosError) {
        // 400, 409 오류 처리
        if (error.response?.status === 400) {
          return "입력값이 올바르지 않습니다. 다시 확인해주세요.";
        }
        if (error.response?.status === 409) {
          return "이미 사용 중인 이메일입니다.";
        }
  
        // 비밀번호 오류 처리
        if (error.response?.data?.error?.includes("비밀번호는 최소 8자 이상")) {
          return "비밀번호는 최소 8자 이상, 대소문자, 숫자 및 특수문자를 포함하고 최대 20자여야 합니다.";
        }
  
        // 그 외의 오류 처리
        return error.response?.data?.message || "회원가입에 실패했습니다. 다시 시도해주세요.";
      }
      return "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  };


// 비밀번호 변경 서비스
const changePasswordService = async (passwordData: ChangePasswordRequest): Promise<string> => {
    try {
        await changePassword(passwordData);
        return "비밀번호가 성공적으로 변경되었습니다.";
    } catch (error) {
        if (error instanceof AxiosError) {
          // 400, 401 오류 처리
          if (error.response?.status === 400) {
            return "입력값이 올바르지 않습니다. 다시 확인해주세요.";
          }
          if (error.response?.status === 401) {
            return "현재 비밀번호가 올바르지 않습니다.";
          }      

          return error.response?.data?.message || "비밀번호 변경에 실패했습니다. 다시 시도해주세요.";
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
            // AxiosError가 발생한 경우
            console.error("회원 탈퇴 중 오류 발생:", error.response?.data || error.message);
        } else {
            console.error("회원 탈퇴 중 알 수 없는 오류 발생:", error);
        }
        throw new Error("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
};

export { registerService, changePasswordService, deleteAccountService };