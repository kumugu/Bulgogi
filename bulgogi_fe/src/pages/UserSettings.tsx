import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { FaLock as Lock } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import useUserSettings from "@/features/userSettings/useUserSettings";
import { useUserStore } from "@/store/userStore";
import { UserProfile } from "@/types/user";

const SettingsPage = () => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const {
        user,
        formData,
        setFormData,
        handleUpdate,
        handlePasswordChange: changePassword,
        handleDeleteUser,
        updateUserInfo
    } = useUserSettings();

    const [securityForm, setSecurityForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [isSecurityUpdating, setIsSecurityUpdating] = useState({
        password: false,
    });

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) =>  {
        const file = event.target.files?.[0];
        if (file) {
            // 업로드 로직
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e:React.FormEvent) => {
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

    // 비밀번호 변경 처리 함수
    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSecurityUpdating({ password: true });

        // 비밀번호 확인 검증
        if (securityForm.newPassword !== securityForm.confirmPassword) {
            alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
            setIsSecurityUpdating({ password: false });
            return;
        }

        try {
            if (user) {
                await changePassword({
                    userId: user.userId,
                    oldPassword: securityForm.confirmPassword,
                    newPassword: securityForm.newPassword,
                });
                // 성공 시 폼 초기화
                setSecurityForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                alert("비밀번호가 성공적으로 변경되었습니다.");
            }
        } catch (error) {
            console.error("비밀번호 변경 실패", error);
            alert("비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.");
        } finally {
            setIsSecurityUpdating({ password: false });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Profile Section */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
                    <FaUpload className="h-5 w-5 mr-2" />
                    Profile Settings
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Profile Photo */}
                    <div className="mb-6 flex items-center space-x-4">
                        <button type="button" className="text-neutral-700 dark:text-neutral-300 flex items-center">
                            Change Photo
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />

                        <button
                            type="button"
                            onClick={handleButtonClick}
                            className="text-neutral-700 dark:text-neutral-300 flex items-center"
                        >
                            <FaUpload className="h-4 w-4 mr-2" />
                        </button>
                    </div>

                    {/* Username - 필요 시 추가 */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                            placeholder="Your username"
                        />
                    </div>

                    {/* Bio */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Bio
                        </label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white min-h-[100px]"
                            placeholder="Write a brief introduction about yourself..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200"
                    >
                        Save Profile
                    </button>
                </form>
            </div>

            {/* Security Section */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
                    <Lock className="h-5 w-5 mr-2" />
                    Security Settings
                </h2>

                {/* Password Change Form */}
                <form onSubmit={handlePasswordChange} className="mb-8">
                    <h3 className="text-lg font-medium mb-4 dark:text-white">Change Password</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={securityForm.currentPassword}
                                onChange={(e) =>
                                    setSecurityForm((prev) => ({
                                        ...prev,
                                        currentPassword: e.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={securityForm.newPassword}
                                onChange={(e) =>
                                    setSecurityForm((prev) => ({
                                        ...prev,
                                        newPassword: e.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                                required
                                minLength={8}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={securityForm.confirmPassword}
                                onChange={(e) =>
                                    setSecurityForm((prev) => ({
                                        ...prev,
                                        confirmPassword: e.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isSecurityUpdating.password}
                        className="w-full mt-4 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200 disabled:opacity-50"
                    >
                        {isSecurityUpdating.password ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> 
                                Updating...
                            </>
                        ) : (
                            "Update Password"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;