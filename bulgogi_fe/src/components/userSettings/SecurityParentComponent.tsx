import React, { useState } from "react";
import SecuritySection from "./SecuritySection";
import { api } from "@/api/axios";
import { handlePasswordChangeAPI } from "@/api/user/userSettingsApi";

const ParentComponent = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // 비밀번호 필드 값 변경 처리
    const handlePasswordFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "oldPassword") setOldPassword(value);
        if (name === "newPassword") setNewPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    // 비밀번호 필드 초기화
    const resetPasswords = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    // 비밀번호 변경 처리 (API 호출 또는 로직 작성)
    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        setError(null);

        if (newPassword !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            setIsUpdating(false);
            return;
        }

        try {
            await handlePasswordChangeAPI({
                oldPassword,
                newPassword,
            });;

            resetPasswords();
        } catch (error) {
            console.error("비밀번호 변경 실패:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div>
            <SecuritySection
                oldPassword={oldPassword}
                newPassword={newPassword}
                confirmPassword={confirmPassword}
                error={error}
                isUpdating={isUpdating}
                onPasswordFieldChange={handlePasswordFieldChange}
                onPasswordChange={handlePasswordChange}
                resetPasswords={resetPasswords}
            />
        </div>
    );
};

export default ParentComponent;