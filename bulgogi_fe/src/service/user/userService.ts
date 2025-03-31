// import { getMyInfo, updateMyProfileImage, removeMyProfileImage } from "@/api/user/userApi";
// import { useAuthStore } from "@/store/user/authStore";
// import { useUserStore } from "@/store/user/userStore";
// import { MyProfile, UpdatedMyBioRequest } from "@/types/user/userTypes";
// import { DEFAULT_PROFILE_IMAGE } from "@/utils/constants/constants";
// import { AxiosError } from "axios";
// import { tokenUtils } from "@/utils/user/auth/tokenUtils";

// 상태 업데이트 함수
// const updateProfileImageState = (profileImageUrl: string | null) => {
//     useAuthStore.getState().setAuth({
//         ...useAuthStore.getState().auth,
//         profileImage: profileImageUrl || DEFAULT_PROFILE_IMAGE, // 기본 이미지로 설정
//     });

//     useUserStore.getState().setUserProfile({
//         ...useUserStore.getState().userProfile,
//         profileImage: profileImageUrl || DEFAULT_PROFILE_IMAGE,
//     });
// };


// // 사용자 정보 조회 서비스
// const getMyInfoService = async (): Promise<MyProfile> => {
//     const token = tokenUtils.getToken(); // 세션에서 토큰 가져오기
//     if (!token) {
//         throw new Error("로그인된 사용자가 아닙니다.");
//     }

//     const response = await getMyInfo(token); // 토큰을 Authorization 헤더에 포함시켜 API 호출
//     if (!response.success || !response.data) {
//         throw new Error(response.message || "사용자 정보를 가져오는 데 실패했습니다.");
//     }
//     return response.data;
// };

// // 자기소개 수정 서비스
// const updateMyBioService = async (updateData: UpdatedMyBioRequest): Promise<MyProfile> => {
//     const token = tokenUtils.getToken(); // 세션에서 토큰 가져오기
//     if (!token) {
//         throw new Error("로그인된 사용자가 아닙니다.");
//     }

//     const response = await updateMyBio(updateData, token); // 토큰을 Authorization 헤더에 포함시켜 API 호출

//     if (!response.success || !response.data) {
//         throw new Error(response.message || "자기소개 수정에 실패했습니다.");
//     }
//     return response.data;
// };


// 프로필 이미지 가져오기 서비스
// const getProfileImageService = async (): Promise<string> => {
//     try {
//         const response = await getProfileImage();
//         return response.data.profileImageUrl;  // 올바른 값을 반환
//     } catch (error) {
//         console.error("프로필 이미지 가져오기 실패:", error);
//         throw error;
//     }
// };


// // 프로필 이미지 수정 서비스
// const updateMyProfileImageService = async (file: File): Promise<string> => {
//     try {
//         const response = await updateMyProfileImage(file);

//         if (response?.data?.profileImageUrl) {
//             const profileImageUrl = response.data.profileImageUrl;
//             console.log("프로필 이미지가 성공적으로 업데이트되었습니다:", profileImageUrl);

//             // 프로필 이미지 상태 업데이트
//             updateProfileImageState(profileImageUrl);
            
//             // 최신 프로필 정보 다시 가져오기
//             await getProfileImageService(); 

//             return profileImageUrl;
//         } else {
//             console.error("Invalid API response:", response);
//             throw new Error("프로필 이미지 URL이 응답에 포함되어 있지 않습니다.");
//         }
//     } catch (error) {
//         if (error instanceof AxiosError && error.response?.data?.message) {
//             console.error("API 호출 중 오류 발생:", error.response.data.message);
//             throw new Error(error.response.data.message);
//         } else if (error instanceof Error) {
//             console.error("API 호출 중 일반 오류 발생:", error.message);
//             throw new Error(error.message);
//         } else {
//             console.error("예상치 못한 오류 발생:", error);
//             throw new Error("프로필 이미지 업데이트 중 알 수 없는 오류가 발생했습니다.");
//         }
//     }
// };

    
// // 프로필 이미지 동기화 서비스
// const syncProfileImage = async () => {
//     const storedProfileImage = useAuthStore.getState().auth.profileImage;

//     try {
//         // 서버에서 최신 프로필 이미지 URL 가져오기
//         const response = await getProfileImageService();
//         if (response && storedProfileImage !== response) {
//             // 프로필 이미지가 변경되었으면 상태 갱신
//             updateProfileImageState(response);
//         }
//     } catch (error) {
//         console.error("프로필 이미지 동기화 중 오류 발생:", error);
//     }
// };


// // 프로필 이미지 삭제 서비스
// const deleteMyProfileImageService = async (): Promise<string> => {
//     try {
//         const response = await removeMyProfileImage();

//         // 응답 검증
//         if (!response || !response.data || typeof response.data.profileImageUrl !== "string") {
//             throw new Error(response.data?.message || "프로필 이미지 삭제 실패");
//         }

//         const profileImageUrl = response.data.profileImageUrl;
//         updateProfileImageState(profileImageUrl); // 기본 이미지로 상태 업데이트
//         return profileImageUrl;
//     } catch (error) {
//         if (error instanceof AxiosError && error.response?.data?.message) {
//             console.error("API 호출 중 오류 발생:", error.response.data.message);
//             throw new Error(error.response.data.message);
//         } else if (error instanceof Error) {
//             console.error("API 호출 중 일반 오류 발생:", error.message);
//             throw new Error(error.message);
//         } else {
//             console.error("예상치 못한 오류 발생:", error);
//             throw new Error("프로필 이미지 삭제 중 알 수 없는 오류가 발생했습니다.");
//         }
//     }
// };


// export { updateProfileImageState, getMyInfoService, getProfileImageService, syncProfileImage, updateMyProfileImageService, deleteMyProfileImageService };