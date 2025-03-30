import { MyProfile, ApiResponse, UpdatedMyBioRequest, ProfileImageResponse } from "@/types/user/userTypes";
import { api } from "../axios";


// 자기 정보 조회 (전체 조회회)
const getMyInfo = async (): Promise<ApiResponse> => {
    try {
        const response = await api.get<ApiResponse<MyProfile>>('/users/my-info');
        return response.data;
    } catch (error) {
        throw error;
    }
};


// 자기 정보 수정 (bio)
const updateMyBio = async (bioData: { bio: string }): Promise<ApiResponse> => {
    try {
        const response = await api.put<ApiResponse<MyProfile>>(`/users/my-info/bio`, bioData);
        return response.data;
    } catch (error) {
        throw error;
    }
}


// 자기 정보 조회 (profileImage get)
const getProfileImage = async (): Promise<ApiResponse<string>> => {
    try {
      const response = await api.get<ApiResponse<string>>("/users/profile-image");
      console.log('getProfileImageByToken 응답:', response);  
      return response.data; 
    } catch (error) {
      console.error('getProfileImageByToken 호출 중 오류 발생:', error); 
      throw error;  
    }
  }


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