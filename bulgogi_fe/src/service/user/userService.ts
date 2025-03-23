import { getMyInfo, updateMyBio, updateMyProfileImage } from "@/api/user/userApi";
import { UpdatedUserBioRequest, UpdateUserProfileImageRequest } from "@/types/user/userTypes";

// 사용자 정보 조회 서비스
const getMyInfoService = async () => {
    try {
        const response = await getMyInfo();

        if (!response.success) {
            throw new Error(response.message || "사용자 정보를 가져오는 데 실패했습니다.");
        }

        return response.data;   // UserProfile 반환
    } catch (error) {
        console.error("사용자 정보 조회 중 오류 발생:", error);
        throw new Error("사용자 정보를 가져올 수 없습니다.");
    }
};

// 자기 자신 Bio 수정 서비스
const updateMyBioService = async (updateData: UpdatedUserBioRequest) => {
    try {
        const response = await updateMyBio(updateData);

        if (!response.success) {
            throw new Error(response.message || "사용자 소개 수정에 실패했습니다.");
        }

        return response.data;   // 업데이트 된 UserProfile 반환
    } catch (error) {
        console.error("사용자 bio 수정 중 오류 발생:", error);
        throw new Error("사용자 bio를 수정할 수 없습니다.");
    }
};

// 자기 자신 ProfileImage 수정 서비스
const updateMyProfileImageService = async (updateData: UpdateUserProfileImageRequest) => {
    try {
        const response = await updateMyProfileImage(updateData);

        if (!response.success) {
            throw new Error(response.message || "사용자 프로필 이미지지 수정에 실패했습니다.");
        }

        return response.data;   // 업데이트 된 UserProfile 반환
    } catch (error) {
        console.error("사용자 profileImage 수정 중 오류 발생:", error);
        throw new Error("사용자 profileImage를 수정할 수 없습니다.");
    }
};


export { getMyInfo, updateMyBioService, updateMyProfileImageService }