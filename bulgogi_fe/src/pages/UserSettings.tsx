import React, { useState } from "react";
import useUserSettings from "@/features/user/userSettings/useUserSettings";
import ProfileSection from "@/components/userSettings/ProfileSection";
import SecuritySection from "@/components/userSettings/SecuritySection";
import DeleteAccountSection from "@/components/userSettings/DeleteAccountSection";

const UserSettings = () => {
    const {
        formData,
        setFormData,
        handleUpdate,
        handleDeleteUser,
        handlePasswordChange,
    } = useUserSettings();

    const [securityForm, setSecurityForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // 프로필 업데이트 처리
    const handleProfileSubmit = async () => {
        await handleUpdate({
            bio: formData.bio,
            profileImage: formData.profileImage,
        });
    };

    // 비밀번호 변경 요청 처리
    const handleSecuritySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        setError(null);

        if (securityForm.newPassword !== securityForm.confirmPassword) {
            alert("새 비밀번호가 일치하지 않습니다.");
            setIsUpdating(false);
            return;
        }

        try {
            await handlePasswordChange({
                oldPassword: securityForm.oldPassword,
                newPassword: securityForm.newPassword,
            });
            resetPasswords();
        } catch(error) {
            console.error("비밀번호 변경 실패:", error);
            setError("비밀번호 변경에 실패했습니다.");
        } finally {
            setIsUpdating(false);
        }
    };

    // 보안 입력 필드 변경 처리
    const handleSecurityFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSecurityForm((prev) => ({ ...prev, [name]: value }));
    };

    // 입력 필드 초기화 함수
    const resetPasswords = () => {
        setSecurityForm({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">User Settings</h1>
            
            {/* 프로필 수정 섹션 */}
            <ProfileSection
                bio={formData.bio}
                onBioChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                onSubmit={handleProfileSubmit}
            />
            
            {/* 보안 설정 섹션 */}
            <SecuritySection
                oldPassword={securityForm.oldPassword}
                newPassword={securityForm.newPassword}
                confirmPassword={securityForm.confirmPassword}
                error={error}
                isUpdating={isUpdating}
                onPasswordChange={handleSecuritySubmit}
                onPasswordFieldChange={handleSecurityFieldChange}
                resetPasswords={resetPasswords}
            />

            {/* 회원 탈퇴 섹션 */}
            <DeleteAccountSection onDelete={handleDeleteUser} />
        </div>
    );
};

export default UserSettings;
