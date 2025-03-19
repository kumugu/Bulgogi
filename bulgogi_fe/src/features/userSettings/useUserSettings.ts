import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { UserProfile } from "@/types/user";

export const useUserSettings = () => {
    const { user, fetchUserInfo, updateUserInfo, changePassword, deleteUser } = useUserStore();
    const [formData, setFormData] = useState({ username: "", bio: "", profileImage: "" });

    // 사용자 정보 가져오기
    useEffect(() => {
        fetchUserInfo();    // 페이지 로드 시 사용자 정보 가져오기
    }, [fetchUserInfo]);

    // 사용자 정보가 변경되면 폼에 데이터 반영
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                bio: user.bio,
                profileImage: user.profileImage,
            });
        }
    }, [user]);

    // 정보 업데이트
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (user) {
            await updateUserInfo({
                userId: user.userId,
                username: formData.username,
                bio: formData.bio,
                profileImage: formData.profileImage,
            });
        }
    };

    // 비밀번호 변경
    const handlePasswordChange = async (data: { userId: number; oldPassword: string; newPassword: string }) => {
        await changePassword(data);
    };

    // 회원 탈퇴
    const handleDeleteUser = async (password: string) => {
        if (user) {
            await deleteUser({
                userId: user.userId,
                password: password,
            });
        }
    };

    return {
        user,
        formData, 
        setFormData,
        handleUpdate,
        handlePasswordChange,
        handleDeleteUser,
        updateUserInfo
    };
};

export default useUserSettings;