import { useEffect } from "react"
import ProfileImage from "@/components/user/userSettings/ProfileImageRead"
import UserBio from "@/components/user/userSettings/BioRead";
import TokenMonitor from "@/components/user/auth/TokenMonitor"
import { useAuthStore } from "@/store/user/authStore"
import { useUserStore } from "@/store/user/userStore"
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constants/constants"

const MyBlogHome = () => {
  const { auth } = useAuthStore()
  const { userProfile } = useUserStore()
  const profileImage = userProfile.profileImage || auth.profileImage || DEFAULT_PROFILE_IMAGE

  useEffect(() => {
  }, [auth.profileImage, userProfile.profileImage])

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900">My Blog</h1>
        </div>

        {/* 사용자 정보 */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">
            <p className="text-xl text-neutral-600">{auth.username || "Username not set"}</p>
          </h2>
          <div className="flex flex-col">
            <div className="flex items-center space-x-4">
              <ProfileImage imageUrl={profileImage} />
            </div>

            {/* 자기소개 컴포넌트 추가 */}
            <div className="mt-4">
              <h3 className="text-md font-medium text-neutral-700">-</h3>
              <UserBio />
            </div>
          </div>

        </div>
            <TokenMonitor />
      </div>
    </div>
  )
}

export default MyBlogHome

