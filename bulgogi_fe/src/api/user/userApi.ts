import { MyProfile, ApiResponse, UpdatedMyBioRequest, ProfileImageResponse } from "@/types/user/userTypes";
import { api } from "../axios";
import { useAuthStore } from "@/store/user/authStore";
import { useUserStore } from "@/store/user/userStore";
import axios from "axios";


// 사용자 정보 조회
const getMyInfo = async (token: string) => {
    try {
        const response = await axios.get<ApiResponse<MyProfile>>("/users/my-info", {
            headers: {
                Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


// 자기소개 수정
const updateMyBio = async (updateData: UpdatedMyBioRequest, token: string) => {
    try {
        const response = await axios.put<ApiResponse<MyProfile>>("/users/my-info/bio", updateData, {
            headers: {
                Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


// 자기 정보 조회 (profileImage get)
const getProfileImage = async (): Promise<ApiResponse<{ profileImageUrl: string }>> => {
    try {
      const response = await api.get<ApiResponse<{ profileImageUrl: string }>>("/users/profile-image");
  
      console.log('getProfileImage 응답:', response);
      
      // 프로필 이미지 URL을 useUserStore에 저장
      useUserStore.getState().setProfileImageUrl(response.data.data.profileImageUrl); // data 안에 profileImageUrl 있음
  
      // 인증 상태 업데이트 (필요한 경우)
      useAuthStore.getState().setAuth({
        accessToken: useAuthStore.getState().auth.accessToken, // 기존 accessToken 유지
        username: useAuthStore.getState().auth.username, // 기존 username 유지
        profileImage: response.data.data.profileImageUrl, // profileImage도 업데이트
      });
  
      return response.data;
    } catch (error: any) {
      console.error('getProfileImage 호출 중 오류 발생:', error);
      throw error;
    }
};
  

// 자기 정보 수정 (profileImage update)
const updateMyProfileImage = async (file: File): Promise<ApiResponse<ProfileImageResponse>> => {
  try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.put<ApiResponse<ProfileImageResponse>>("/users/profile-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
  } catch (error) {
      console.error("프로필 이미지 업로드 실패:", error);
      throw error;
  }
};



// 자기 정보 삭제 (profileImage delete)
const removeMyProfileImage = async (): Promise<ApiResponse> => {
    try {
        const response = await api.delete(`/users/profile-image`);
        return response.data;
    } catch (error) {
           console.error("removeMyProfileImage 호출 중 오류 발생:", error);
        throw error;
    }
};

export { getMyInfo, updateMyBio, getProfileImage, updateMyProfileImage, removeMyProfileImage };