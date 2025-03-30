import React, { useState, useEffect } from "react";
import { useProfileImage } from "@/features/user/userSettings/useProfileImage"; 
import { updateProfileImageState } from "@/service/user/userService";
import ProfileImage from "./ProfileImage";
import { useAuthStore } from "@/store/user/authStore";
import { useUserStore } from "@/store/user/userStore";

const DEFAULT_PROFILE_IMAGE = "https://bulgogoi-image.s3.ap-northeast-2.amazonaws.com/profile-images/default-profile.png";

const ProfileImageUploader: React.FC = () => {
  const { profileImageUrl, updateProfileImage, deleteProfileImage, loading, error } = useProfileImage();
  const [preview, setPreview] = useState<string | null>(DEFAULT_PROFILE_IMAGE);
  const { auth } = useAuthStore();
  const { userProfile } = useUserStore();
  const profileImage = userProfile.profileImage || auth.profileImage || DEFAULT_PROFILE_IMAGE;

  useEffect(() => {
    setPreview(profileImageUrl || DEFAULT_PROFILE_IMAGE);
  }, [profileImageUrl]);

  const createPreviewUrl = (file: File): string => {
    return URL.createObjectURL(file);
  };

  const revokePreviewUrl = (url: string | null): void => {
    if (url && url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  };

  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const localUrl = createPreviewUrl(file);
        revokePreviewUrl(preview);
        setPreview(localUrl);

        try {
            await updateProfileImage(file); // void 반환 함수
            // 업로드 후 필요한 URL을 다른 방식으로 얻거나, null을 전달
            updateProfileImageState(null); // 또는 다른 적절한 URL 값
        } catch (err) {
            console.error("프로필 이미지 업로드 에러:", err);
        }
    }
};


const handleDeleteImage = async () => {
  try {
      await deleteProfileImage(); // 파일 삭제 API 호출
      revokePreviewUrl(preview);
      setPreview(DEFAULT_PROFILE_IMAGE);
      updateProfileImageState(null); // 상태 초기화 호출, 반환값 없음
  } catch (err) {
      console.error("프로필 이미지 삭제 에러:", err);
  }
};


  return (
    <div className="flex flex-col items-center">
      {/* 프로필 이미지 미리보기 */}
      <ProfileImage imageUrl={profileImage} />

      {/* 파일 업로드 버튼 */}
      <label className="mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md">
        이미지 변경
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
      </label>

      {/* 삭제 버튼 */}
      <button
        onClick={handleDeleteImage}
        className="mt-2 text-red-500 text-sm underline"
        disabled={loading}
      >
        프로필 이미지 삭제
      </button>

      {/* 로딩 상태 표시 */}
      {loading && <div className="mt-2 text-sm text-gray-600">로딩 중...</div>}
      
      {/* 에러 메시지 */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ProfileImageUploader;