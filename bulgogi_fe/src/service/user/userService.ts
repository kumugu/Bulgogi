import { getMyInfo, updateMyBio, updateMyProfileImage, removeMyProfileImage, getProfileImage } from "@/api/user/userApi";
import { useAuthStore } from "@/store/user/authStore";
import { useUserStore } from "@/store/user/userStore";
import { MyProfile, UpdatedMyBioRequest } from "@/types/user/userTypes";

// 상태 업데이트 함수
const updateProfileImageState = (profileImageUrl: string | null) => {
    useAuthStore.getState().setAuth({
        ...useAuthStore.getState().auth,
        profileImage: profileImageUrl || null,
    });
    useUserStore.getState().setUserProfile({
        ...useUserStore.getState().userProfile,
        profileImage: profileImageUrl || null,
    });
};


// 사용자 정보 조회 서비스
const getMyInfoService = async (): Promise<MyProfile> => {
    const response = await getMyInfo();
    if (!response.success || !response.data) {
        throw new Error(response.message || "사용자 정보를 가져오는 데 실패했습니다.");
    }
    return response.data;
};

// 자기소개 수정 서비스
const updateMyBioService = async (updateData: UpdatedMyBioRequest): Promise<MyProfile> => {
    const response = await updateMyBio(updateData);
    if (!response.success || !response.data) {
        throw new Error(response.message || "자기소개 수정에 실패했습니다.");
    }
    return response.data;
};

// 프로필 이미지 가져오기 서비스
const getProfileImageService = async (): Promise<string | null> => {
    const response = await getProfileImage();
    return response.data || null; // null 반환으로 기본값 설정
};


// 프로필 이미지 상태 동기화
const syncProfileImage = async () => {
    const storedProfileImage = useAuthStore.getState().auth.profileImage;

    try {
        const response = await getProfileImageService();
        if (response && storedProfileImage !== response) {
            updateProfileImageState(response);
        }
    } catch (error) {
        console.error("프로필 이미지 동기화 중 오류 발생:", error);
    }
};


// 프로필 이미지 수정 서비스
const updateMyProfileImageService = async (file: File): Promise<string> => {
    const response = await updateMyProfileImage(file);

    // Ensure the API response contains the correct structure
    if (response && response.data && typeof response.data.profileImageUrl === "string") {
        const profileImageUrl = response.data.profileImageUrl;
        console.log("Profile image updated successfully:", profileImageUrl);
        updateProfileImageState(profileImageUrl);
        return profileImageUrl;
    } else {
        console.error("Invalid API response:", response);
        throw new Error("프로필 이미지 URL이 응답에 포함되어 있지 않습니다.");
    }
};




// 프로필 이미지 삭제 서비스
const deleteMyProfileImageService = async (): Promise<string> => {
    const response = await removeMyProfileImage();
    if (!response || !response.message) {
        console.error("API 응답이 잘못되었습니다:", response);
        throw new Error("프로필 이미지 삭제 실패");
    }
    return response.message;
};

export { updateProfileImageState, getMyInfoService, updateMyBioService, getProfileImageService, syncProfileImage, updateMyProfileImageService, deleteMyProfileImageService };