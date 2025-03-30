import { useState } from "react";
import { useUserStore } from "@/store/user/userStore";
import { deleteMyProfileImageService, updateMyProfileImageService } from "@/service/user/userService";

export const useProfileImage = () => {
    const { setUserProfile, userProfile } = useUserStore(); // userProfile 가져오기
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(userProfile.profileImageUrl || null);

    // 프로필 이미지 수정
    const updateProfileImage = async (file: File) => {
        setLoading(true);
        setError(null);
        
        try {
            const imageUrl = await updateMyProfileImageService(file);
            
            // 프로필 이미지 상태 업데이트
            setProfileImageUrl(imageUrl);
            setUserProfile({
                profileImage: imageUrl,
                profileImageUrl: imageUrl,
            });
        } catch (error: any) {
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
            await deleteMyProfileImageService();
            
            // 상태 초기화
            setProfileImageUrl(null);
            setUserProfile({
                ...userProfile, // 기존 데이터 유지
                profileImage: null,
                profileImageUrl: null,
            });
        } catch (error: any) {
            console.error("프로필 이미지 삭제 실패:", error);
            setError("프로필 이미지 삭제에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 반환 객체에 profileImageUrl 추가
    return { profileImageUrl, updateProfileImage, deleteProfileImage, loading, error };
};