import React, { useState } from "react";
import { FaLock as Lock } from "react-icons/fa";

interface DeleteAccountProps {
    onDelete: (PasswordData: { confirmPassword: string }) => void;
}

const DeleteAccountSection: React.FC<DeleteAccountProps> = ({ onDelete }) => {
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirmPassword) {
            alert("비밀번호를 입력해주세요.");
            return;
        }
        onDelete({ confirmPassword });
    };

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center dark:text-white">
                <Lock className="h-5 w-5 mr-2" />
                Delete Account
            </h2>
            <p className="text-sm text-gray-600">
            Are you sure you want to delete your account? This action cannot be undone.
            </p>

            <form onSubmit={handleSubmit} className="mt-3">
                <input
                    type="password"
                    placeholder="비밀번호 입력"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border p-2 w-full rounded"
                />
                <button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 bg-red-600 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-red-800 dark:hover:bg-neutral-100 transition-colors duration-200 disabled:opacity-50"
                >
                    Delete Account
                </button>
            </form>

        </div>

    );
};

export default DeleteAccountSection;