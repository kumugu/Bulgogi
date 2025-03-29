import React, { useState, useEffect } from "react";
import { useProfileImage } from "@/features/user/userSettings/useProfileImage"; 
import ProfileImage from "./ProfileImage";

const ProfileImageUploader: React.FC = () => {
  const { profileImageUrl, updateProfileImage, deleteProfileImage, loading, error } = useProfileImage();
  // preview: 로컬 미리보기용 URL 또는 저장소에서 받아온 최종 URL
  const [preview, setPreview] = useState<string | null>(null);

  // profileImageUrl 변경 시 preview 상태 동기화
  useEffect(() => {
    if (profileImageUrl) {
      // 만약 기존 preview가 blob URL이라면 해제
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
      setPreview(profileImageUrl);
    } else {
      setPreview("https://bulgogoi-image.s3.ap-northeast-2.amazonaws.com/profile-images/default-profile.png");
    }
  }, [profileImageUrl, preview]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 로컬 미리보기 URL 생성
      const localUrl = URL.createObjectURL(file);
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
      setPreview(localUrl);
      
      try {
        await updateProfileImage(file);
      } catch (err) {
        console.error("프로필 이미지 업로드 에러:", err);
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      await deleteProfileImage();
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
      setPreview(null);
    } catch (err) {
      console.error("프로필 이미지 삭제 에러:", err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* 프로필 이미지 미리보기 */}
      <ProfileImage imageUrl={preview} size={100} altText="프로필 이미지" />

      {/* 파일 업로드 버튼 */}
      <label className="mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md">
        이미지 변경
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
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