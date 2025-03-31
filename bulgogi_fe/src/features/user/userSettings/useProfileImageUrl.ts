import { useAuthStore } from "@/store/user/authStore";
import { useUserStore } from "@/store/user/userStore";
import { DEFAULT_PROFILE_IMAGE } from "@/utils/constants/constants";

export const useProfileImageUrl = () => {
    const { auth } = useAuthStore();
    const { userProfile } = useUserStore();

    return userProfile.profileImage || auth.profileImage || DEFAULT_PROFILE_IMAGE;
};