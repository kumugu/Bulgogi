import { useState } from "react"
import { updateProfileImage, deleteProfileImage } from "@/api/user/userApi"
import { useAuthStore } from "@/store/user/authStore"
import { useUserStore } from "@/store/user/userStore"
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constants/constants"

/**
 * 프로필 이미지 관리 훅
 * 이미지 업데이트, 삭제 기능과 로딩/에러 상태를 제공합니다.
 */
export const useProfileImage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { auth, setAuth } = useAuthStore()
  const { setUserProfile } = useUserStore()

  /**
   * 프로필 이미지 업데이트 함수
   * @param file 업로드할 이미지 파일
   */
  const updateImage = async (file: File) => {
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await updateProfileImage(formData)

      // profileImage가 아닌 profileImageUrl 속성 사용
      const imageUrl = response.profileImageUrl

      // 전역 상태 업데이트
      updateGlobalState(imageUrl)

      return response
    } catch (err) {
      console.error("프로필 이미지 업데이트 에러:", err)
      setError("프로필 이미지 업데이트에 실패했습니다.")
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * 프로필 이미지 삭제 함수
   */
  const deleteImage = async () => {
    setLoading(true)
    setError(null)

    try {
      await deleteProfileImage()

      // 전역 상태 업데이트 (기본 이미지로)
      updateGlobalState(DEFAULT_PROFILE_IMAGE)
    } catch (err) {
      console.error("프로필 이미지 삭제 에러:", err)
      setError("프로필 이미지 삭제에 실패했습니다.")
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * 전역 상태 업데이트 함수
   * @param imageUrl 새 이미지 URL
   */
  const updateGlobalState = (imageUrl: string) => {
    // Auth 스토어 업데이트
    setAuth({
      ...auth,
      profileImage: imageUrl,
    })

    // User 스토어 업데이트
    setUserProfile({
      profileImage: imageUrl,
      profileImageUrl: imageUrl,
    })
  }

  return {
    updateProfileImage: updateImage,
    deleteProfileImage: deleteImage,
    loading,
    error,
  }
}
