import { useState } from "react"
import { UpdateUserMyProfileImageRequest } from "@/types/user/userTypes";
import { updateMyProfileImageService } from "@/service/user/userService";

export const useUpdateMyProfileImage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [updatedMyProfileImage, setUpdatedMyProfileImage] = useState<UpdateUserMyProfileImageRequest | null>(null);

    const updateMyProfileImage = async (updateData: UpdateUserMyProfileImageRequest) => {
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const updateMyProfileImageData = await updateMyProfileImageService(updateData);
            setUpdatedMyProfileImage(updateMyProfileImageData || null);
            setMessage("프로필 이미지를 성공적으로 변경했습니다.")
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류 발생";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { updateMyProfileImage, loading, error, message, updatedMyProfileImage };
};