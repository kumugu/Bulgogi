import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/user/authStore"
import { useUserStore } from "@/store/user/userStore"
import { getProfileImage } from "@/api/user/userApi"
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constants/constants"

/**
 * 프로필 이미지 URL을 가져오는 훅
 * 로컬 상태, 전역 상태, API 호출을 통해 최신 프로필 이미지 URL을 제공합니다.
 */
export const useProfileImageUrl = () => {
  const { auth } = useAuthStore()
  const { userProfile, setUserProfile } = useUserStore()
  const [profileImageUrl, setProfileImageUrl] = useState<string>(
    userProfile.profileImageUrl || userProfile.profileImage || auth.profileImage || DEFAULT_PROFILE_IMAGE,
  )

  useEffect(() => {
    // 이미 프로필 이미지가 있으면 API 호출 스킵
    if (userProfile.profileImageUrl || userProfile.profileImage || auth.profileImage) {
      const imageUrl = userProfile.profileImageUrl || userProfile.profileImage || auth.profileImage
      setProfileImageUrl(imageUrl || DEFAULT_PROFILE_IMAGE)
      return
    }

    // 프로필 이미지 API 호출
    const fetchProfileImage = async () => {
      try {
        const response = await getProfileImage()
        // profileImage가 아닌 profileImageUrl 속성 사용
        const imageUrl = response.profileImageUrl || DEFAULT_PROFILE_IMAGE

        // 상태 업데이트
        setProfileImageUrl(imageUrl)

        // 전역 상태 업데이트
        setUserProfile({
          profileImage: imageUrl,
          profileImageUrl: imageUrl,
        })
      } catch (error) {
        console.error("프로필 이미지 조회 에러:", error)
        setProfileImageUrl(DEFAULT_PROFILE_IMAGE)
      }
    }

    fetchProfileImage()
  }, [auth.profileImage, userProfile.profileImage, userProfile.profileImageUrl])

  // 전역 상태가 변경되면 로컬 상태도 업데이트
  useEffect(() => {
    const newImageUrl =
      userProfile.profileImageUrl || userProfile.profileImage || auth.profileImage || DEFAULT_PROFILE_IMAGE

    if (newImageUrl !== profileImageUrl) {
      setProfileImageUrl(newImageUrl)
    }
  }, [auth.profileImage, userProfile.profileImage, userProfile.profileImageUrl])

  return profileImageUrl
}

