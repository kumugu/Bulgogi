import { useState } from "react"
import { UpdateMyProfileImageRequest } from "@/types/user/userTypes";
import { updateMyProfileImageService } from "@/service/user/userService";

export const useUpdateMyProfileImage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const updateMyProfileImage = async (updateData: FormData) => { 
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            await updateMyProfileImageService(updateData);
            setMessage("프로필 이미지를 성공적으로 변경했습니다.");
        } catch (error: any) {
            setError(error instanceof Error ? error.message : "알 수 없는 오류 발생");
        } finally {
            setLoading(false);
        }
    };

    return { updateMyProfileImage, loading, error, message };
};