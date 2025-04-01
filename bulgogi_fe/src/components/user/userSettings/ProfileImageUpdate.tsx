import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useProfileImage } from "@/hooks/user/userSettings/useProfileImage"
import { useProfileImageUrl } from "@/hooks/user/userSettings/useProfileImageUrl"
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constants/constants"
import ProfileImage from "./ProfileImageRead"
import { toast } from "react-toastify"
import { X } from "lucide-react"
import { FaUserAlt, FaCamera } from "react-icons/fa";

const ProfileImageUploader: React.FC = () => {
  const { updateProfileImage, deleteProfileImage, loading, error } = useProfileImage()
  const profileImage = useProfileImageUrl()
  const [preview, setPreview] = useState<string | null>(profileImage)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPreview(profileImage)
  }, [profileImage])

  useEffect(() => {
    return () => {
      if (preview && preview !== profileImage && preview !== DEFAULT_PROFILE_IMAGE && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview, profileImage])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      toast.error("JPEG, PNG, GIF 형식의 이미지만 업로드 가능합니다.")
      return
    }

    const MAX_SIZE_MB = 5
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`이미지 크기가 너무 큽니다. ${MAX_SIZE_MB}MB 이하로 업로드해주세요.`)
      return
    }

    if (preview && preview !== profileImage && preview !== DEFAULT_PROFILE_IMAGE && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview)
    }

    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)
    setSelectedFile(file)
  }

  const handleUpdateImage = async () => {
    if (!selectedFile) return

    try {
      await updateProfileImage(selectedFile)
      toast.success("프로필 이미지가 성공적으로 변경되었습니다.")
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (err) {
      console.error("프로필 이미지 업로드 에러:", err)
      toast.error("업로드에 실패했습니다. 다시 시도해주세요.")
    }
  }

  const handleDeleteImage = async () => {
    try {
      await deleteProfileImage()
      setShowDeleteConfirm(false)
      toast.success("프로필 이미지가 성공적으로 삭제되었습니다.")
    } catch (err) {
      console.error("프로필 이미지 삭제 에러:", err)
      toast.error("삭제에 실패했습니다. 다시 시도해주세요.")
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false); // 삭제 확인 모달을 닫는 함수
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
        <FaCamera className="h-5 w-5 mr-2" />
        Profile Image
      </h2>

      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <ProfileImage imageUrl={preview || profileImage} size={96} />

          {/* 삭제 버튼이 보여지는 조건 */}
          {preview && preview !== DEFAULT_PROFILE_IMAGE && !loading && (
            <button
              onClick={() => setShowDeleteConfirm(true)} // 삭제 확인 모달 열기
              className="absolute top-0 right-0 p-2 bg-neutral-700 text-white rounded-full hover:bg-neutral-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* 파일 선택 버튼 */}
        <button
          onClick={handleFileSelect}
          className="px-4 py-2 bg-neutral-700 dark:bg-neutral-300 text-white dark:text-black rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-400 transition-colors"
        >
          File Select
        </button>

        {/* 파일 선택된 경우 이름 표시 */}
        {selectedFile && (
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
            선택된 파일: {selectedFile.name}
          </p>
        )}

        {/* 숨겨진 파일 입력 필드 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* 업데이트 버튼 */}
        <button
          onClick={handleUpdateImage}
          disabled={!selectedFile || loading}
          className="w-full mt-4 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile Image"}
        </button>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg max-w-md w-full">
            <div className="flex items-center mb-4 text-red-600">
              <h3 className="text-lg font-bold">Confirm Deletion</h3>
            </div>

            <div className="mb-6">
              <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                정말로 프로필 이미지를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm"
              >
                취소
              </button>
              <button
                onClick={handleDeleteImage}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                disabled={loading}
              >
                {loading ? "삭제 중..." : "프로필 이미지 삭제"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImageUploader;