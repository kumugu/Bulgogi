import { api } from "@/api/axios";
import { ProfileImageResponse, UserBioResponse, UserBioUpdateRequest } from "@/types/user/userTypes";

  /**
   * 사용자 자기소개 조회 API
   * GET /api/users/my-info/bio
   * @returns Promise<UserBioResponse>
   */
  export const getUserBio = async (): Promise<UserBioResponse> => {
    const response = await api.get<UserBioResponse>("/users/my-info/bio")
    return response.data
  }
  
  /**
   * 사용자 자기소개 수정 API
   * PUT /api/users/my-info/bio
   * @param data 수정할 자기소개 데이터
   * @returns Promise<UserBioResponse>
   */
  export const updateUserBio = async (data: UserBioUpdateRequest): Promise<UserBioResponse> => {
    const response = await api.put<UserBioResponse>("/users/my-info/bio", data)
    return response.data
  }


/**
 * 프로필 이미지 조회 API
 * GET /api/users/profile-image
 * @returns Promise<ProfileImageResponse>
 */
export const getProfileImage = async (): Promise<ProfileImageResponse> => {
    const response = await api.get<ProfileImageResponse>("/users/profile-image")
    return response.data
  }
  
  /**
   * 프로필 이미지 업데이트 API
   * PUT /api/users/profile-image
   * @param formData 이미지 파일을 포함한 FormData
   * @returns Promise<ProfileImageResponse>
   */
  export const updateProfileImage = async (formData: FormData): Promise<ProfileImageResponse> => {
    const response = await api.put<ProfileImageResponse>("/users/profile-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  }
  
  /**
   * 프로필 이미지 삭제 API
   * DELETE /api/users/profile-image
   * @returns Promise<void>
   */
  export const deleteProfileImage = async (): Promise<void> => {
    await api.delete("/users/profile-image")
  }

