import { useState } from "react";
import { useAuthStore } from "@/store/user/authStore";
import { useUserStore } from "@/store/user/userStore";
import { updateMyProfileImageService, deleteMyProfileImageService } from "@/service/user/userService";

export const useProfileImage = () => {
    const { setUserProfile, userProfile } = useUserStore();
    const { setAuth, auth } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 프로필 이미지 업데이트
    const updateProfileImage = async (file: File) => {
        setLoading(true);
        setError(null);

        try {
            const newImageUrl = await updateMyProfileImageService(file);

            // 상태 업데이트 (네비바, 마이블로그홈 등 최신 이미지 반영)
            setUserProfile({
                ...userProfile,
                profileImage: newImageUrl,
            });

            setAuth({
                ...auth,
                profileImage: newImageUrl,
            });
        } catch (error) {
            console.error("프로필 이미지 업데이트 실패:", error);
            setError("프로필 이미지 업데이트에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 프로필 이미지 삭제
    const deleteProfileImage = async () => {
        setLoading(true);
        setError(null);

        try {
            const defaultImageUrl = await deleteMyProfileImageService();

            // 상태 업데이트 (기본 이미지로 변경)
            setUserProfile({
                ...userProfile,
                profileImage: defaultImageUrl,
            });

            setAuth({
                ...auth,
                profileImage: defaultImageUrl,
            });
        } catch (error) {
            console.error("프로필 이미지 삭제 실패:", error);
            setError("프로필 이미지 삭제에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return { updateProfileImage, deleteProfileImage, loading, error };
};