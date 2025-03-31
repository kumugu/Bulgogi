import { useState, useEffect } from "react";
import { useProfileImage } from "@/features/user/userSettings/useProfileImage";
import { useProfileImageUrl } from "@/features/user/userSettings/useProfileImageUrl";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constants/constants";
import ProfileImage from "./ProfileImage";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const ProfileImageUploader: React.FC = () => {
    const { updateProfileImage, deleteProfileImage, loading, error } = useProfileImage();
    const profileImage = useProfileImageUrl(); // 항상 최신 상태 반영
    const [preview, setPreview] = useState<string | null>(profileImage);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        setPreview(profileImage);
    }, [profileImage]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("JPEG, PNG, GIF 형식의 이미지만 업로드 가능합니다.");
            return;
        }

        const MAX_SIZE_MB = 5;
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            toast.error(`이미지 크기가 너무 큽니다. ${MAX_SIZE_MB}MB 이하로 업로드해주세요.`);
            return;
        }

        const localUrl = URL.createObjectURL(file);
        setPreview(localUrl);
        setSelectedFile(file);
    };

    const handleUpdateImage = async () => {
        if (!selectedFile) return;

        try {
            await updateProfileImage(selectedFile);
            toast.success("프로필 이미지가 성공적으로 변경되었습니다.");
            setSelectedFile(null);
        } catch (err) {
            console.error("프로필 이미지 업로드 에러:", err);
            toast.error("업로드에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleDeleteImage = async () => {
        try {
            await deleteProfileImage();
            setShowDeleteConfirm(false);
            toast.success("프로필 이미지가 성공적으로 삭제되었습니다.");
        } catch (err) {
            console.error("프로필 이미지 삭제 에러:", err);
            toast.error("삭제에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">프로필 이미지</h2>
    
        <div className="flex flex-col items-center">
          {/* 프로필 이미지 미리보기 및 삭제 버튼 */}
          <div className="relative mb-4">
            <ProfileImage imageUrl={preview} />
            {preview !== DEFAULT_PROFILE_IMAGE && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="absolute top-0 right-0 bg-neutral-200 dark:bg-neutral-700 rounded-full p-1 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
                aria-label="Delete profile image"
              >
                <X size={16} className="text-neutral-700 dark:text-neutral-200" />
              </button>
            )}
          </div>
    
          {/* 파일 선택 영역 */}
          <div className="w-full mb-4">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              프로필 이미지 선택
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
            />
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              JPEG, PNG, GIF 형식의 이미지만 업로드 가능합니다. (최대 5MB)
            </p>
          </div>
    
          {/* 업데이트 버튼 */}
          {selectedFile && (
            <button
              onClick={handleUpdateImage}
              className="w-full mt-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "업데이트 중..." : "프로필 이미지 업데이트"}
            </button>
          )}
    
          {/* 메시지 표시 */}
          {error && <p className="mt-2 text-red-600">{error}</p>}
        </div>
    
        {/* 삭제 확인 모달 */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg max-w-sm w-full">
              <h3 className="text-lg font-medium mb-4 dark:text-white">이미지를 삭제하시겠습니까?</h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                프로필 이미지를 삭제하면 기본 이미지로 변경됩니다.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm"
                >
                  취소
                </button>
                <button
                  onClick={handleDeleteImage}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? "삭제 중..." : "삭제"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default ProfileImageUploader;
