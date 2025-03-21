import React, { useState } from "react";
import { updateMyInfo, changePassword, deleteUser } from "@/api/user/userSettingsApi";
import { UserProfile } from "@/types/userTypes";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const useUserSettings = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const [formData, setFormData] = useState<{ bio: string; profileImage: string}>({
        bio: '',
        profileImage: '',
    });

    const [user, setUser] = useState<UserProfile | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (data?: { bio: string; profileImage: string }) => {
        try {
            if (data) {
                await updateMyInfo(formData);
                setFormData({ bio: "", profileImage: "" });
                alert("회원정보가 변경 되었습니다.");
            } else {
                console.error("업데이트 데이터가 없습니다.");
            }
        } catch (error) {
            console.error("회원정보 변경 실패:", error);
        }
    };

    const handlePasswordChange = async (passwordData: { oldPassword: string; newPassword: string }) => {
        try {
            await changePassword(passwordData);
            alert("비밀번호가 변경 되었습니다.");
        } catch (error) {
            console.error("비밀번호 변경 실패:", error);
        }
    };

    const handleDeleteUser = async (passwordData: { confirmPassword: string }) => {
        try {
            await deleteUser(passwordData);

            // 인증 정보 초기화
            logout();
            sessionStorage.removeItem("accessToken");
            
            alert("회원 탈퇴 성공");
            navigate("/")
        } catch (error) {
            console.error("탈퇴 실패:", error);
            alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
        }
    };


    return {
        user,
        formData,
        setFormData,
        handleUpdate,
        handleDeleteUser,
        handleInputChange,
        handlePasswordChange,
    };
};

export default useUserSettings;