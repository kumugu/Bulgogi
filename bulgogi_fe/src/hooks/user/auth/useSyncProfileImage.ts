import { useEffect } from "react";
import { useAuthStore } from "@/store/user/authStore";
import { getProfileImageService } from "@/service/user/userService";

const useSyncProfileImage = () => {
    const { profileImage, setAuth } = useAuthStore((state) => ({
        profileImage: state.auth.profileImage,
        setAuth: state.setAuth,
    }));

    useEffect(() => {
        const syncImage = async () => {
            try {
                const latestImage = await getProfileImageService();

                if (profileImage !== latestImage) {
               
                    setAuth({
                        ...useAuthStore.getState().auth,
                        profileImage: latestImage,
                    });
                }
            } catch (error) {
                console.error("프로필 이미지 동기화 실패:", error);
            }
        };

        syncImage();
    }, [profileImage, setAuth]); // profileImage 변경 시 동작
};

export default useSyncProfileImage;
