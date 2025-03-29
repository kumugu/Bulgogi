import { useState } from "react";
import { useUserStore } from "@/store/user/userStore";
import { deleteMyProfileImageService, updateMyProfileImageService } from "@/service/user/userService";

export const useProfileImage = () => {
    const { setUserProfile } = useUserStore();
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // 프로필 이미지 수정
    const updateProfileImage = async (file: File) => {
        setLoading(true);
        setError(null);
        
        try {
            // 서버에 파일을 업로드하고, 업로드된 이미지 URL을 반환받음
            const imageUrl = await updateMyProfileImageService(file);

            // 프로필 이미지 URL 상태 업데이트
            setProfileImageUrl(imageUrl);
            setUserProfile({ 
                profileImage: imageUrl,
                profileImageUrl: imageUrl
             });  // 상태 업데이트

        } catch (error: any) {
            setError("프로필 이미지 업데이트에 실패했습니다.");
            throw error;
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
            setUserProfile({ 
                profileImage: null,
                profileImageUrl: null
            }); // 프로필 이미지 삭제 후 상태 초기화
            setProfileImageUrl(null); // URL도 초기화
        } catch (error: any) {
            setError("프로필 이미지 삭제에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };
    
    return { profileImageUrl, updateProfileImage, deleteProfileImage, loading, error };
};
