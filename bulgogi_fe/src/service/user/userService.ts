import { getMyInfo, updateMyBio, updateMyProfileImage } from "@/api/user/userApi";
import { MyProfile, UpdatedMyBioRequest, UpdateUserMyProfileImageRequest } from "@/types/user/userTypes";
import { AxiosError } from "axios";

// 사용자 정보 조회 서비스
const getMyInfoService = async (): Promise<MyProfile> => {
    try {
        const response = await getMyInfo();

        if (!response.success || !response.data) {
            throw new Error(response.message || "사용자 정보를 가져오는 데 실패했습니다.");
        }

        return response.data;   // MyProfile 반환
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data?.message || "사용자 정보를 가져오는 데 실패했습니다.";
        }
        throw new Error("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    }
};


// 자기 자신 Bio 수정 서비스
const updateMyBioService = async (updateData: UpdatedMyBioRequest): Promise<MyProfile> => {
    try {
        const response = await updateMyBio(updateData);

        if (!response.success) {
            throw new Error(response.message || "자기소개 수정에 실패했습니다.");
        }

        if (!response.data) {
            throw new Error("수정된 자기소개 데이터를 반환할 수 없습니다.");
        }

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data?.message || "자기소개 수정 중 오류가 발생했습니다.";
        }
        throw new Error("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    }
};


// 자기 자신 ProfileImage 수정 서비스
const updateMyProfileImageService = async (updateData: UpdateUserMyProfileImageRequest): Promise<MyProfile> => {
    try {
        const response = await updateMyProfileImage(updateData);

        if (!response.success) {
            throw new Error(response.message || "프로필 이미지 수정에 실패했습니다.");
        }
        
        if (!response.data) {
            throw new Error("프로필 이미지 수정 후 반환된 데이터가 없습니다.");
        }

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data?.message || "프로필 이미지 수정 중 오류가 발생했습니다.";
        }
        throw new Error("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    }
};


export { getMyInfoService, updateMyBioService, updateMyProfileImageService }