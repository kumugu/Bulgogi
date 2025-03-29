import { getMyInfo, updateMyBio, updateMyProfileImage, removeMyProfileImage, getProfileImageByToken } from "@/api/user/userApi";
import { MyProfile, UpdatedMyBioRequest, ProfileImageResponse, ApiResponse } from "@/types/user/userTypes";

// 사용자 정보 조회 서비스
const getMyInfoService = async (): Promise<MyProfile> => {
    const response = await getMyInfo();

    if (!response.success || !response.data) {
        throw new Error(response.message || "사용자 정보를 가져오는 데 실패했습니다.");
    }

    const userInfo = response.data;

    // 프로필 이미지 URL이 이미 있을 경우, 더 이상 비동기 호출하지 않음
    if (userInfo.profileImage && !userInfo.profileImageUrl) {
        try {
            const imageResponse = await getProfileImageByToken();
            userInfo.profileImageUrl  = imageResponse.data; // URL로 업데이트
        } catch (error) {
            console.error("프로필 이미지 로드 실패:", error);
        }
    }

    return userInfo;
};


// 자기소개(Bio) 수정
const updateMyBioService = async (updateData: UpdatedMyBioRequest): Promise<MyProfile> => {
    const response = await updateMyBio(updateData);
    if (!response.success || !response.data) {
        throw new Error(response.message || "자기소개 수정에 실패했습니다.");
    }
    return response.data;
};


// 프로필 이미지 수정 서비스
const updateMyProfileImageService = async (file: File): Promise<string> => {
    try {
        console.log("프로필 이미지 업데이트 시작", file);
        
        // ApiResponse<ProfileImageResponse> 타입으로 변경
        const response = await updateMyProfileImage(file);
        console.log("updateMyProfileImage 응답:", response);
    
        // data.profileImageUrl을 안전하게 접근
        if (!response.data.profileImageUrl) {
            throw new Error("프로필 이미지 업데이트 실패");
        }
    
        console.log("업데이트된 프로필 이미지 URL:", response.data.profileImageUrl);
        return response.data.profileImageUrl;
    } catch (error) {
        console.error("프로필 이미지 업데이트 실패:", error);
        throw error;
    }
};


  
// 프로필 이미지 삭제 서비스
const deleteMyProfileImageService = async (): Promise<string> => {
    try {
        const response = await removeMyProfileImage();
        // 삭제 API의 반환 구조가 { message: string } 형태라고 가정합니다.
        if (!response.message) {
        throw new Error("프로필 이미지 삭제 실패");
        }
        return response.message;
    } catch (error) {
        console.error("프로필 이미지 삭제 실패:", error);
        throw error;
    }
};
  

export { getMyInfoService, updateMyBioService, updateMyProfileImageService, deleteMyProfileImageService };
