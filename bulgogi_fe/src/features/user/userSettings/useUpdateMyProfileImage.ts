import axios from "axios";
import { useState } from "react"
import { useAuth } from "../auth/useAuth";
import { useUserStore } from "@/store/user/userStore";

export const useUpdateMyProfileImage = () => {
    const { auth } = useAuth();
    const { setUserProfile } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const updateMyProfileImage = async (file: File) => { 
        if (!file) return;

        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (!auth.accessToken) throw new Error("로그인이 필요합니다.");

            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.put("http://localhost:8080/api/users/profile-image", formData, {
                headers: { 
                    Authorization: `Bearer ${auth.accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setUserProfile({ profileImage: response.data.profileImage });
            setMessage("프로필 이미지가 성공적으로 업데이트되었습니다.");

        } catch (error: any) {
            setError(error.response?.data?.message || "프로필 이미지를 변경할 수 없습니다.");
        } finally {
            setLoading(false);
        }
    };

    return { updateMyProfileImage, loading, error, message };
};