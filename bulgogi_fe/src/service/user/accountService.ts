import { changePassword, handlePasswordChangeAPI, deleteUser } from "@/api/user/accountApi";
import { ChangePasswordRequest, DeleteUserRequest } from "@/types/users/accountTypes";
import { tokenUtils } from "@/utils/tokenUtils";
import { AxiosError } from "axios";

// 비밀번호 변경 서비스
const changePasswordService = async (passwordData: ChangePasswordRequest): Promise<string> => {
    try {
        // API 호출
        await changePassword(passwordData);

        // 성공 메시지 반환
        return "비밀번호가 성공적으로 변경되었습니다.";
    } catch (error) {
        console.error("비밀번호 변경 중 오류 발생:", error);

        throw new Error("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
};


// 로그아웃 서비스
const deleteUserService = async (deleteData: DeleteUserRequest): Promise<string> => {
    try {
        await deleteUser(deleteData);
        return "회원 탈퇴가 성공적으로 처리되었습니다.";
    } catch (error) {
        console.error("회원 탈퇴 중 오류 발생:", error);

        throw new Error("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
};

export { changePasswordService, deleteUserService };


