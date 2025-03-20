import React, { ChangeEvent, useState } from "react";
import { FaLock as Lock } from "react-icons/fa";
import { FaSpinner as Loader2 } from "react-icons/fa";
import { handlePasswordChangeAPI } from "@/api/userApi";


interface SecuritySectionProps {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    error: string | null;
    isUpdating: boolean;
    onPasswordChange: (e: React.FormEvent) => Promise<void>;
    onPasswordFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    resetPasswords: () => void;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({
    oldPassword,
    newPassword,
    confirmPassword,
    error,
    isUpdating,
    onPasswordChange,
    onPasswordFieldChange,
    resetPasswords,
}) => {
    
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
                <Lock className="h-5 w-5 mr-2" />
                Security Settings
            </h2>

            <form onSubmit={onPasswordChange} className="mb-8">
                <h3 className="text-lg font-medium mb-4 dark:text-white">Change Password</h3>
                <div className="space-y-4">
                    {/* 기존 비밀번호 입력 */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={onPasswordFieldChange}
                            name="oldPassword"
                            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                            required
                        />
                    </div>
                    {/* 새로운 비밀번호 입력 */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={onPasswordFieldChange}
                            name="newPassword"
                            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                            required
                            minLength={8}
                        />
                    </div>
                    {/* 비밀번호 확인 입력 */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={onPasswordFieldChange}
                            name="confirmPassword"
                            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white focus:ring-neutral-900 dark:focus:ring-white"
                            required
                        />
                    </div>
                    {/* 비밀번호 확인 오류 메시지 */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                {/* 업데이트 버튼 */}
                <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full mt-4 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200 disabled:opacity-50"
                >
                    {isUpdating ? (
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
    );
};

export default SecuritySection;